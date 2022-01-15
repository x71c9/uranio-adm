import mixins from 'vue-typed-mixins';

import { Route } from 'vue-router';

import uranio from 'uranio';

import { urn_util, urn_response, urn_log } from "urn-lib";

// import { atom_book } from "uranio-books/atom";

import { Context } from '@nuxt/types';

import shared from './shared';

type SortBy = {
	[prop_name:string]: 1 | -1
};

export type Page = {
	index: number
	total_page_num: number
	total_atom_count: number
	query_limit: number
	sort_by: SortBy
}

type Data<A extends uranio.types.AtomName> = {
	page: Page
	atom_name: A
	plural: string
	atoms: uranio.types.Atom<A>[]
	message: string,
	success: boolean
	error_object:urn_response.Fail<any>
	is_read_only: boolean
};

type Methods = {
	
}
type Computed = {
}

type Props = {
}

export default mixins(shared).extend<Data<uranio.types.AtomName>, Methods, Computed, Props>({
	layout(): string {
		return "urn-admin";
	},
	mixins: [
		shared
	],
	provide():any{
		return {
			page: (this as any).page,
			plural: (this as any).plural,
			is_read_only: (this as any).is_read_only,
			atoms: (this as any).atoms,
			atom_name: (this as any).atom_name
		};
	},
	key(route:Route):string {
		return route.fullPath;
	},
	// watchQuery: [
	//   'page',
	//   'limit',
	//   'sort'
	// ],
	watchQuery(_oldQuery:unknown, _newQuery:unknown):boolean{
		return true;
	},
	async asyncData<A extends uranio.types.AtomName>(context:Context)
			:Promise<Data<A>> {
		
		urn_log.debug('AsyncData.context.params', context.params);
		
		await context.store.dispatch('auth/authenticate');
		
		const atom_name = context.params.slug as A;
		
		/** TODO **/
		/* Validate atom_name */
		
		let message = '';
		let success = false;
		let error_object = {} as urn_response.Fail<any>;
		
		let plural = atom_name + "s";
		let count_success = false;
		let find_success = false;
		let atoms: uranio.types.Molecule<A>[] = [];
		
		let is_read_only = false;
		
		let total_atom_count = 0;
		let total_page_num = 0;
		let index = 0;
		let query_limit = 10;
		let sort_by:SortBy = {_date: -1};

		if(context.query.page){
			index = parseInt(context.query.page as any) - 1;
		}
		if(context.query.limit){
			query_limit = parseInt(context.query.limit as any);
			if(query_limit < 0){
				query_limit = 1;
			}else if(query_limit > 128){
				query_limit = 128;
			}
		}
		if(context.query.sort){
			sort_by = context.query.sort as unknown as SortBy;
		}
		
		if(uranio.book.atom.validate_name(atom_name)){
			// const atom_def = atom_book[atom_name] as uranio.types.Book.BasicDefinition;
			const atom_def = uranio.book.atom.get_definition(atom_name);
			if(urn_util.object.has_key(atom_def, 'plural') && atom_def.plural){
				plural = atom_def.plural;
			}
			// const trx_base = uranio.trx.base.create<A>(atom_name, context.store.state.auth.token);
			const trx_base = uranio.trx.base.create<A>(atom_name);
			const trx_hook_count = trx_base.hook('count');
			const trx_hook_find = trx_base.hook('find');
			
			if(urn_util.object.has_key(atom_def, 'read_only') && atom_def.read_only === true){
				is_read_only = atom_def.read_only;
			}
			
			const trx_res_count = await trx_hook_count({});
			if(trx_res_count.success === true){
				
				total_atom_count = trx_res_count.payload;
				count_success = trx_res_count.success;
				
				const trx_res_find = await trx_hook_find({
					query:{
						options: {
							limit: query_limit,
							sort: sort_by,
							skip: index * query_limit
						}
					} as any
				});
				
				total_page_num = Math.floor(total_atom_count / query_limit);
				const reminder = total_atom_count % query_limit;
				if(reminder > 0){
					total_page_num += 1;
				}
				if(total_page_num === 0){
					total_page_num = 1;
				}
				
				if(index < 0 || index > total_page_num - 1){
					
					context.error({ statusCode: 404, message: "Page not found" });
					
				}
				
				find_success = trx_res_find.success;
				
				success = count_success && find_success;
				
				if(trx_res_find.success === true){
					atoms = trx_res_find.payload;
				}else{
					message = (trx_res_find as urn_response.Fail<any>).err_msg || "ERROR";
					error_object = trx_res_find;
				}
				
				urn_log.debug('TRX Response: ', trx_res_find);
				
			}else{
				message = (trx_res_count as urn_response.Fail<any>).err_msg || "ERROR";
				error_object = trx_res_count;
			}
			
		}else{
			
			context.error({ statusCode: 404, message: "Page not found" });
			
		}
		
		const page = {
			index,
			total_page_num,
			total_atom_count,
			query_limit,
			sort_by
		};
		
		return {
			page,
			atom_name,
			plural,
			atoms,
			message,
			success,
			error_object,
			is_read_only
		};
	},
});
