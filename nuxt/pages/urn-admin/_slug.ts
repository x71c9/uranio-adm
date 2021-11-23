import {Route} from 'vue-router';

import uranio from 'uranio';

import { urn_util, urn_response } from "urn-lib";

import { atom_book } from "uranio-books/atom";

type ErrorParams = {
	statusCode: number;
	message: string;
};
type Context = {
	params: {
		slug: string
	}
	query: {
		page: number
	}
	error: (p: ErrorParams) => void
};
export type Page = {
	index: number
	total_page_num: number
	total_atom_count: number
	query_limit: number
}
type ReturnData<N extends uranio.types.AtomName> = {
	page: Page
	atom_name: N;
	plural: string;
	atoms: uranio.types.Atom<N>[];
	message: string;
	success: boolean;
};

export default {
	layout(): string {
		return "urn-admin";
	},
	provide():any{
		return {
			page: (this as any).page,
			atoms: (this as any).atoms,
			atom_name: (this as any).atom_name
		};
	},
	key(route:Route):string {
		return route.fullPath;
	},
	watchQuery: [
		'page'
	],
	async asyncData<A extends uranio.types.AtomName>(context:Context)
			:Promise<ReturnData<A>> {
		
		console.log('AsyncData.context.params', context.params);
		
		const atom_name = context.params.slug as A;
		
		let plural = atom_name + "s";
		let message = "";
		let count_success = false;
		let find_success = false;
		let success = false;
		let atoms: uranio.types.Molecule<A>[] = [];
		
		let total_atom_count = 0;
		let total_page_num = 0;
		let index = 0;
		const query_limit = 3; // This must be updated with the value of uranio api config `request_auto_limit`
		
		if(context.query.page){
			index = parseInt(context.query.page as any) - 1;
		}
		
		if(urn_util.object.has_key(atom_book, atom_name)){
			const atom_def = atom_book[atom_name] as uranio.types.Book.BasicDefinition;
			if(urn_util.object.has_key(atom_def, 'plural') && atom_def.plural){
				plural = atom_def.plural;
			}
			const trx_base = uranio.trx.base.create<A>(atom_name);
			const trx_hook_count = trx_base.hook('count');
			const trx_hook_find = trx_base.hook('find');
			
			const trx_res_count = await trx_hook_count({});
			if(trx_res_count.status == 200){
				
				total_atom_count = trx_res_count.payload;
				count_success = trx_res_count.success;
				
				const trx_res_find = await trx_hook_find({
					query:{
						options: {
							limit: query_limit,
							sort: {
								_date: -1
							},
							skip: index * query_limit
						}
					} as any
				});
				
				total_page_num = Math.floor(total_atom_count / query_limit);
				const reminder = total_atom_count % query_limit;
				if(reminder > 0){
					total_page_num += 1;
				}
				
				if(index < 0 || index > total_page_num - 1){
					
					context.error({ statusCode: 404, message: "Page not found" });
					
				}
				
				find_success = trx_res_find.success;
				
				success = count_success && find_success;
				
				if(trx_res_find.status == 200){
					atoms = trx_res_find.payload;
				}else{
					message = (trx_res_find as urn_response.Fail<any>).err_msg || "ERROR";
				}
				
				console.log('TRX Response: ', trx_res_find);
				
			}else{
				message = (trx_res_count as urn_response.Fail<any>).err_msg || "ERROR";
			}
			
		}else{
			
			context.error({ statusCode: 404, message: "Page not found" });
			
		}
		
		const page = {
			index,
			total_page_num,
			total_atom_count,
			query_limit
		};
		
		return {
			page,
			atom_name,
			plural,
			atoms,
			message,
			success,
		};
	},
};
