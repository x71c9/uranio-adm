import mixins from 'vue-typed-mixins';

import { Route } from 'vue-router';

import uranio from 'uranio/client';

import { urn_util, urn_response, urn_log, urn_return } from "urn-lib";

import { Context } from '@nuxt/types';

import shared from './shared';

import { Notification } from '../../store/notification';

type SortBy = {
	[prop_name:string]: 1 | -1
};

type PageQuery = {
	page: number
	limit: number
	sort: SortBy
}

type LoadedData<A extends uranio.schema.AtomName, D extends uranio.schema.Depth> = {
	atoms: uranio.schema.Molecule<A,D>[]
	page: Page
}

export type Page = {
	index: number
	total_page_num: number
	total_atom_count: number
	query_limit: number
	sort_by: SortBy
}

type Data<A extends uranio.schema.AtomName> = {
	page: Page
	atom_name: A
	plural: string
	atoms: uranio.schema.Molecule<A,0>[]
	message: string,
	success: boolean
	error_object:urn_response.Fail<any>
	is_read_only: boolean
};

type Methods = {
	add_atoms<A extends uranio.schema.AtomName>(atoms:uranio.schema.Atom<A>):void
	delete_atoms(ids: string[]): Promise<void>
	delete_all_atoms(): Promise<void>
	reload_atoms(): Promise<void>
	fail(): void
}

type Computed = {
}

type Props = {
}

export type UploadedFile = {
	id: string
	name: string
	url: string
}

export default mixins(shared).extend<Data<uranio.schema.AtomName>, Methods, Computed, Props>({
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
	methods:{
		fail(){
			//
		},
		add_atoms<A extends uranio.schema.AtomName>(atoms:uranio.schema.Atom<A>){
			this.atoms.unshift(atoms);
			this.page.total_atom_count += 1;
		},
		async delete_all_atoms(){
			//
		},
		async delete_atoms(ids:string[]){
			const trx_base = uranio.trx.base.create(this.atom_name);
			const args = {
				params:{
					ids: ids.join(',')
				}
			};
			const urn_res = await trx_base.hook('delete_multiple')(args);
			if(!urn_res.success){
				return this.fail();
			}
			
			const deleted_ids = urn_res.payload.map(a => a._from);
			
			let count = 0;
			for(const id of deleted_ids){
				if(!id){
					continue;
				}
				count++;
				const index = this.atoms.map(a => a._id).indexOf(id);
				this.$delete(this.atoms, index);
			}
			this.page.total_atom_count -= count;
			
			(this.$refs.allTable as any)?.check_none();
			
			const not_label = (ids.length > 1) ? this.plural : this.atom_name;
			this.$store.dispatch('notification/show_notification', {
				type: Notification.ERROR,
				message: `${not_label} deleted.`,
			});
			if(this.atoms.length === 0){
				this.reload_atoms();
			}
		},
		async reload_atoms(){
			try{
				const query:PageQuery = {
					page: Number(this.page.index) + 1, // index is -1 compared to query param
					limit: Number(this.page.query_limit),
					sort: this.page.sort_by
				};
				const loaded_data = await _load_data(this.atom_name, query, 0);
				
				for(const atom of loaded_data.atoms){
					this.atoms.push(atom);
				}
				
				(this.$refs.allTable as any)?.reset_check();
				(this.$refs.allTable as any)?.reload_check();
				
				this.page.index = loaded_data.page.index;
				this.page.query_limit = loaded_data.page.query_limit;
				this.page.sort_by = loaded_data.page.sort_by;
				this.page.total_atom_count = loaded_data.page.total_atom_count;
				this.page.total_page_num = loaded_data.page.total_page_num;
				
			}catch(e){
				const err = e as unknown as urn_response.Fail<any>;
				this.error_object = err;
				this.message = err.message || '[ERROR]';
			}
		}
	},
	
	async asyncData<A extends uranio.schema.AtomName>(
		context:Context
	):Promise<Data<A>> {
		
		urn_log.debug('AsyncData.context.params', context.params);
		
		await context.store.dispatch('auth/authenticate');
		
		let success = false;
		
		const atom_name = context.params.slug as A;
		
		if(!uranio.book.validate_name(atom_name)){
			urn_log.error(`Invalid context param slug.`);
			context.error({ statusCode: 404, message: "Page not found" });
		}
		
		let plural = atom_name + "s";
		let is_read_only = false;
		
		const atom_def = uranio.book.get_definition(atom_name);
		if(urn_util.object.has_key(atom_def, 'plural') && atom_def.plural){
			plural = atom_def.plural;
		}
		if(urn_util.object.has_key(atom_def, 'read_only') && atom_def.read_only === true){
			is_read_only = atom_def.read_only;
		}
		
		let message = '';
		let error_object:urn_response.Fail<any> = {} as urn_response.Fail<any>;
		
		const query:PageQuery = {
			page: Number(context.query.page),
			limit: Number(context.query.limit),
			sort: context.query.sort as unknown as SortBy
		};
		
		let atoms:uranio.schema.Atom<A>[] = [];
		
		let page:Page = {
			index: 0,
			total_page_num: 0,
			total_atom_count: 0,
			query_limit: 0,
			sort_by: {_date: -1}
		};
		
		try{
			const loaded_data = await _load_data<A,0>(atom_name, query, 0);
			atoms = loaded_data.atoms;
			page = loaded_data.page;
			success = true;
		}catch(e){
			const err = e as unknown as urn_response.Fail<any>;
			error_object = err;
			message = err.message || '[ERROR]';
			success = false;
		}
		
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

async function _count_atoms(atom_name:uranio.schema.AtomName)
		:Promise<number>{
	const trx_base = uranio.trx.base.create(atom_name);
	const trx_hook_count = trx_base.hook('count');
	const trx_res_count = await trx_hook_count({});
	if(!trx_res_count.success){
		throw trx_res_count;
	}
	return trx_res_count.payload;
}

async function _find_atoms<A extends uranio.schema.AtomName, D extends uranio.schema.Depth>(
	atom_name: A,
	query_limit: number,
	sort_by: SortBy,
	skip: number,
	depth?:D
):Promise<uranio.schema.Molecule<A,D>[]>{
	
	const trx_base = uranio.trx.base.create(atom_name);
	const trx_hook_find = trx_base.hook<'find', D>('find');
	
	const find_params = {
		query: {
			options: {
				limit: query_limit,
				sort: sort_by,
				skip: skip,
				depth: depth
			}
		}
	} as unknown as uranio.types.Hook.Arguments<A, 'find', D>;
	
	const trx_res_find = await trx_hook_find(find_params);
	
	if(!trx_res_find.success){
		throw trx_res_find;
	}
	
	return trx_res_find.payload as unknown as uranio.schema.Molecule<A,D>[];
	
}
	
async function _load_data<A extends uranio.schema.AtomName, D extends uranio.schema.Depth>(
	atom_name:A,
	query:PageQuery,
	depth?:D
):Promise<LoadedData<A,D>>{
	
	let index = 0;
	let query_limit = 10;
	let sort_by:SortBy = {_date: -1};
	
	if(query.page){
		index = parseInt(query.page as any) - 1;
	}
	if(query.limit){
		query_limit = parseInt(query.limit as any);
		if(query_limit < 0){
			query_limit = 1;
		}else if(query_limit > 128){
			query_limit = 128;
		}
	}
	if(query.sort){
		sort_by = query.sort;
	}
	
	const total_atom_count = await _count_atoms(atom_name);
	
	let total_page_num = Math.floor(total_atom_count / query_limit);
	const reminder = total_atom_count % query_limit;
	if(reminder > 0){
		total_page_num += 1;
	}
	if(total_page_num === 0){
		total_page_num = 1;
	}
	
	const skip = index * query_limit;
	
	if(index < 0 || index > total_page_num - 1){
		const ret = urn_return.create();
		throw ret.return_error(
			400,
			`Invalid index. Index greater than maximum.`,
			`INVALID_INDEX`,
			`Invalid index. Index greater than maximum.`
		);
	}
	
	const atoms = await _find_atoms(atom_name, query_limit, sort_by, skip, depth);
	
	const page:Page = {
		total_page_num,
		total_atom_count,
		index,
		query_limit,
		sort_by
	};
		
	return {
		page,
		atoms
	};
}
