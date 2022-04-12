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

export type PageQuery<T = number, S = SortBy> = {
	page: T
	limit: T
	sort: S
	q: string
}

type LoadedData<A extends uranio.schema.AtomName, D extends uranio.schema.Depth> = {
	atoms: uranio.schema.Molecule<A,D>[]
	page: Page
}

export type Page = {
	index: number
	total_page_num: number
	total_atom_count: number
	total_result_count: number
	query_limit: number
	sort_by: SortBy
	search_query: string
	empty_relation: boolean
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
	add_atom<A extends uranio.schema.AtomName>(atoms:uranio.schema.Atom<A>):void
	delete_atoms(ids: string[]): Promise<void>
	delete_all_atoms(): Promise<void>
	load_atoms(q?:string): Promise<void>
	fail(): void
}

type Computed = Record<string, never>

type Props = Record<string, never>

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
		add_atom<A extends uranio.schema.AtomName>(atoms:uranio.schema.Atom<A>){
			this.atoms.unshift(atoms);
			this.page.total_atom_count += 1;
		},
		async delete_all_atoms(){
			return await this.delete_atoms(['*']);
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
			const deleted_ids = urn_res.payload.map((a:uranio.schema.Atom<uranio.schema.AtomName>) => {
				return a._from;
			});
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
			this.page.total_result_count -= count;
			
			(this.$refs.allTable as any)?.check_none();
			
			const not_label = (ids.length > 1) ? this.plural : this.atom_name;
			this.$store.dispatch('notification/show_notification', {
				type: Notification.ERROR,
				message: `${not_label} deleted.`,
			});
			if(this.atoms.length === 0){
				this.load_atoms();
			}
		},
		async load_atoms(q?:string){
			try{
				const query:PageQuery = {
					page: Number(this.page.index) + 1, // index is -1 compared to query param
					limit: Number(this.page.query_limit),
					sort: this.page.sort_by,
					q: q || ''
				};
				
				// This replace the URL without reloading the page.
				// Vue.router replace will reload and lose focust for the search.
				history.replaceState({}, '', this.$route.path+`?${urn_util.url.encode_params(query)}`);
				
				const loaded_data = await _load_data(this.atom_name, query, 0, q);
				urn_log.debug(loaded_data);
				
				this.atoms.splice(0);
				for(const atom of loaded_data.atoms){
					this.atoms.push(atom);
				}
				
				_reset_checkbox(this.$refs.allTable);
				_set_page_data_from_loaded_data(this.page, loaded_data.page);
				
			}catch(e){
				const err = e as unknown as urn_response.Fail<any>;
				this.error_object = err;
				this.message = err.message || '[ERROR]';
			}
		},
	},
	
	async asyncData<A extends uranio.schema.AtomName>(
		context:Context
	):Promise<Data<A>> {
		
		urn_log.debug('AsyncData.context.params', context.params);
		
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
			sort: context.query.sort as unknown as SortBy,
			q: String(context.query.q || '')
		};
		
		let atoms:uranio.schema.Atom<A>[] = [];
		
		let page:Page = {
			index: 0,
			total_page_num: 0,
			total_atom_count: 0,
			total_result_count: 0,
			query_limit: 0,
			sort_by: {_date: -1},
			search_query: '',
			empty_relation: false
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

async function _search_count_atoms(atom_name:uranio.schema.AtomName, q:string)
		:Promise<number>{
	const trx_base = uranio.trx.base.create(atom_name);
	const trx_hook_count = trx_base.hook('search_count');
	const trx_res_count = await trx_hook_count({params: {q: q}});
	if(!trx_res_count.success){
		throw trx_res_count;
	}
	return trx_res_count.payload;
}

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
				depth: depth,
			}
		}
	} as unknown as uranio.types.Hook.Arguments<A, 'find', D>;
	
	const trx_res_find = await trx_hook_find(find_params);
	
	if(!trx_res_find.success){
		throw trx_res_find;
	}
	
	return trx_res_find.payload as unknown as uranio.schema.Molecule<A,D>[];
	
}
	
async function _search_atoms<A extends uranio.schema.AtomName, D extends uranio.schema.Depth>(
	q: string,
	atom_name: A,
	query_limit: number,
	sort_by: SortBy,
	skip: number,
	depth?:D
):Promise<uranio.schema.Molecule<A,D>[]>{
	const trx_base = uranio.trx.base.create(atom_name);
	const trx_hook_search = trx_base.hook<'search', D>('search');
	
	const search_params = {
		params:{
			q: q
		},
		query: {
			options: {
				limit: query_limit,
				sort: sort_by,
				skip: skip,
				depth: depth
			}
		}
	} as unknown as uranio.types.Hook.Arguments<A, 'search', D>;
	
	const trx_res_find = await trx_hook_search(search_params);
	
	if(!trx_res_find.success){
		throw trx_res_find;
	}
	
	return trx_res_find.payload as unknown as uranio.schema.Molecule<A,D>[];
}
	
async function _load_data<A extends uranio.schema.AtomName, D extends uranio.schema.Depth>(
	atom_name: A,
	query: PageQuery,
	depth?: D,
	q?: string
):Promise<LoadedData<A,D>>{
	
	const is_searching = (typeof q === 'string' && q !== '');
	
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
	if(query.q){
		q = query.q;
	}
	
	const total_atom_count = await _count_atoms(atom_name);
	
	const total_result_count = (is_searching) ?
		await _search_count_atoms(atom_name, q || '') : total_atom_count;
	
	let total_page_num = Math.floor(total_result_count / query_limit);
	const reminder = total_result_count % query_limit;
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
	
	const atoms = (is_searching) ?
		await _search_atoms(q || '', atom_name, query_limit, sort_by, skip, depth) :
		await _find_atoms(atom_name, query_limit, sort_by, skip, depth);
	
	const page:Page = {
		total_page_num,
		total_atom_count,
		total_result_count,
		index,
		query_limit,
		sort_by,
		empty_relation: (total_atom_count === 0),
		search_query: q || ''
	};
		
	return {
		page,
		atoms
	};
}

function _reset_checkbox(allTable:any){
	allTable?.reset_check();
	allTable?.reload_check();
}

function _set_page_data_from_loaded_data(this_page:Page, loaded_page:Page){
	this_page.index = loaded_page.index;
	this_page.query_limit = loaded_page.query_limit;
	this_page.sort_by = loaded_page.sort_by;
	this_page.search_query = loaded_page.search_query;
	this_page.total_atom_count = loaded_page.total_atom_count;
	this_page.total_result_count = loaded_page.total_result_count;
	this_page.total_page_num = loaded_page.total_page_num;
}

//function unflatten(data:any) {
//	if (Object(data) !== data || Array.isArray(data))
//		return data;
//	// 
//	const regex = /\.?([^.\[\]]+)|\[(\d+)\]/g;
//	const resultholder = {};
//	for (const p in data) {
//		let cur = resultholder,
//			prop = "",
//			m;
//		while (m == regex.exec(p)) {
//			cur = (cur as any)[prop] || ((cur as any)[prop] = (m[2] ? [] : {}));
//			prop = m[2] || m[1];
//		}
//		(cur as any)[prop] = data[p];
//	}
//	return (resultholder as any)[""] || resultholder;
//}
