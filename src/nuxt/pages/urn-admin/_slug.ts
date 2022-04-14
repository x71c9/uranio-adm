import mixins from 'vue-typed-mixins';

import { Route } from 'vue-router';

import uranio from 'uranio/client';

import { urn_util, urn_response, urn_log } from "urn-lib";

import { Context } from '@nuxt/types';

import shared from './shared';

import { Notification } from '../../store/notification';

type SortBy = {
	[prop_name:string]: 1 | -1
};

export type PageQuery = {
	index: number
	limit: number
	sort: SortBy
	q: string
}

export type QueryObject<T = string> = {
	page?: string | T
	limit?: string | T
	sort?: any
	q?: string
}

export type PageData = {
	total_pages: number
	total_result: number
}

type Data<A extends uranio.schema.AtomName> = {
	atom_name: A
	atoms: uranio.schema.Molecule<A,0>[]
	plural: string
	is_read_only: boolean
	empty_relation: boolean
	total_atoms: number
	page_query: PageQuery,
	page_data: PageData,
	message: string,
	success: boolean
	error_object:urn_response.Fail<any>
};

type Methods = {
	add_atom<A extends uranio.schema.AtomName>(atom:uranio.schema.Atom<A>):void
	get_atoms():Promise<void>
	search_atoms(q:string):Promise<void>
	delete_atoms(ids: string[]): Promise<void>
	delete_all_atoms(): Promise<void>
	update_atoms<A extends uranio.schema.AtomName>(atom_shape: uranio.schema.AtomShape<A>): Promise<void>
	update_all_atoms<A extends uranio.schema.AtomName>(atom_shape: uranio.schema.AtomShape<A>): Promise<void>
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
			atoms: (this as any).atoms,
			atom_name: (this as any).atom_name,
			plural: (this as any).plural,
			page_query: (this as any).page_query,
			page_data: (this as any).page_data,
			total_atoms: (this as any).total_atoms,
			is_read_only: (this as any).is_read_only,
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
			this.total_atoms += 1;
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
			this.total_atoms -= count;
			this.page_data.total_result -= count;
			
			(this.$refs.allTable as any)?.check_none();
			
			const not_label = (ids.length > 1) ? this.plural : this.atom_name;
			this.$store.dispatch('notification/show_notification', {
				type: Notification.ERROR,
				message: `${not_label} deleted.`,
			});
			if(this.atoms.length === 0){
				this.get_atoms();
			}
		},
		async update_all_atoms<A extends uranio.schema.AtomName>(_atom_shape:uranio.schema.AtomShape<A>){
			//
		},
		async update_atoms<A extends uranio.schema.AtomName>(_atom_shape:uranio.schema.AtomShape<A>){
			//
		},
		async search_atoms(q:string){
			this.page_query.q = q;
			this.page_query.index = 0;
			this.get_atoms();
		},
		async get_atoms(){
			
			_reset_checkbox(this.$refs.allTable);
			// _set_page_data_from_loaded_data(this.page, loaded_data.page);
				
			try{
				
				this.atoms.splice(0);
				const atoms = await _get_atoms(this.atom_name, this.page_query);
				for(const atom of atoms){
					this.atoms.push(atom);
				}
				this.page_data.total_result = await _count_atoms(this.atom_name, this.page_query);
				this.page_data.total_pages = _total_pages(this.page_data.total_result, this.page_query.limit);
				
				// if(this.page_query.index > this.page_data.total_pages - 1){
				// 	this.page_query.index = this.page_data.total_pages - 1;
				// 	this.$router.push({
				// 		name: 'urn-admin-slug',
				// 		params: {
				// 			slug: this.atom_name
				// 		},
				// 		query: query_object(this.page_query)
				// 	});
				// 	return;
				// }
				
				// this.$router.push({
				// 	name: 'urn-admin-slug',
				// 	params: {
				// 		slug: this.atom_name
				// 	},
				// 	query: query_object(this.page_query)
				// });
				
				// // This replace the URL without reloading the page.
				// // Vue.router replace will reload and lose focust for the search.
				history.replaceState({}, '', this.$route.path+`?${get_url_query(this.page_query)}`);
				
				this.success = true;
				
			}catch(e){
				
				const err = e as unknown as urn_response.Fail<any>;
				this.error_object = err;
				this.message = err.message || '[ERROR]';
				this.success = false;
				
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
		
		const plural = uranio.book.get_plural(atom_name);
		let is_read_only = false;
		
		let atoms:uranio.schema.Atom<A>[] = [];
		
		const atom_def = uranio.book.get_definition(atom_name);
		if(urn_util.object.has_key(atom_def, 'read_only') && atom_def.read_only === true){
			is_read_only = atom_def.read_only;
		}
		
		const index = Math.abs(Number(context.query.page || 1)) - 1;
		
		let limit = 10;
		if(context.query.limit){
			limit = Math.abs(Number(context.query.limit));
			if(limit > 128){
				limit = 128;
			}
		}
		let sort:SortBy = {_date: -1};
		if(context.query.sort && _validate_sort(context.query.sort, atom_name)){
			sort = context.query.sort as unknown as SortBy;
		}
		let q = '';
		if(context.query.q){
			q = String(context.query.q);
		}
		
		const page_query:PageQuery = {
			index: index,
			limit: limit,
			sort: sort,
			q: q
		};
		
		let message = '';
		let error_object:urn_response.Fail<any> = {} as urn_response.Fail<any>;
		
		let total_atoms = 0;
		
		const page_data:PageData = {
			total_result: 0,
			total_pages: 1,
		};
		
		let empty_relation = false;
		
		try{
			
			total_atoms = await _count_all_atoms(atom_name);
			page_data.total_result = await _count_atoms(atom_name, page_query);
			atoms = await _get_atoms(atom_name, page_query);
			
			page_data.total_pages = _total_pages(page_data.total_result, page_query.limit);
			
			if(page_query.index > page_data.total_pages - 1){
				page_query.index = page_data.total_pages - 1;
			}
			if(page_data.total_result === 0){
				empty_relation = true;
			}
			
			success = true;
			
		}catch(e){
			
			const err = e as unknown as urn_response.Fail<any>;
			error_object = err;
			message = err.message || '[ERROR]';
			success = false;
			
		}
		
		return {
			atom_name,
			atoms,
			is_read_only,
			total_atoms,
			plural,
			page_query,
			page_data,
			message,
			success,
			error_object,
			empty_relation
		};
	},
});

function _total_pages(total_result:number, limit:number){
	return Math.floor(total_result / (limit || 1)) + ((total_result % limit === 0) ? 0 : 1);
}

async function _count_all_atoms<A extends uranio.schema.AtomName>(atom_name:A)
		:Promise<number>{
	
	const trx_response = await _hook_find_count(atom_name, {index: 0, limit: 0, sort: {}, q: ''});
	if(!trx_response.success){
		throw trx_response;
	}
	return trx_response.payload as number;
}

async function _count_atoms<A extends uranio.schema.AtomName>(atom_name:A, page_query:PageQuery)
		:Promise<number>{
	
	let trx_response:urn_response.General<number, any>;
	
	if(page_query.q && page_query.q !== ''){
		
		trx_response = await _hook_search_count(atom_name, page_query);
		
	}else{
		
		trx_response = await _hook_find_count(atom_name, page_query);
		
	}
	if(!trx_response.success){
		throw trx_response;
	}
	return trx_response.payload as number;
}

async function _get_atoms<A extends uranio.schema.AtomName>(atom_name:A, page_query:PageQuery){
	
	let trx_response:urn_response.General<uranio.schema.Molecule<A>[], any>;
	
	if(page_query.q && page_query.q !== ''){
		
		trx_response = await _hook_search(atom_name, page_query);
		
	}else{
		
		trx_response = await _hook_find(atom_name, page_query);
		
	}
	if(!trx_response.success){
		throw trx_response;
	}
	return trx_response.payload;
}

async function _hook_find<A extends uranio.schema.AtomName>(
	atom_name:A,
	page_query:PageQuery
){
	const trx_base = uranio.trx.base.create(atom_name);
	const trx_hook_find = trx_base.hook<'find'>('find');
	const find_params:uranio.types.Hook.Arguments<A, 'find'> = {
		query: _hook_query(page_query)
	} as unknown as uranio.types.Hook.Arguments<A, 'find'>;
	const trx_response = await trx_hook_find(find_params);
	return trx_response;
}

async function _hook_search<A extends uranio.schema.AtomName>(
	atom_name:A,
	page_query:PageQuery
){
	const trx_base = uranio.trx.base.create(atom_name);
	const trx_hook_search = trx_base.hook<'search'>('search');
	const search_params = {
		params: {
			q: page_query.q
		},
		query: _hook_query(page_query)
	} as unknown as uranio.types.Hook.Arguments<A, 'search'>;
	const trx_response = await trx_hook_search(search_params);
	return trx_response;
}

async function _hook_find_count<A extends uranio.schema.AtomName>(
	atom_name:A,
	page_query:PageQuery
){
	const trx_base = uranio.trx.base.create(atom_name);
	const trx_hook_find = trx_base.hook<'count'>('count');
	const find_params:uranio.types.Hook.Arguments<A, 'count'> = {
		query: _hook_query_count(page_query)
	};
	const trx_response = await trx_hook_find(find_params);
	return trx_response;
}

async function _hook_search_count<A extends uranio.schema.AtomName>(
	atom_name:A,
	page_query:PageQuery
){
	const trx_base = uranio.trx.base.create(atom_name);
	const trx_hook_search = trx_base.hook<'search_count'>('search_count');
	const search_params:uranio.types.Hook.Arguments<A, 'search_count'> = {
		params: {
			q: page_query.q
		} as uranio.types.Hook.Params<A, 'search_count'>,
		query: _hook_query_count(page_query)
	};
	const trx_response = await trx_hook_search(search_params);
	return trx_response;
}

function _hook_query(page_query:PageQuery){
	return {
		options: {
			limit: page_query.limit,
			sort: page_query.sort,
			skip: Math.abs(page_query.index * page_query.limit)
		}
	};
}

function _hook_query_count(_page_query:PageQuery){
	return {
		options: {
		}
	};
}

function _validate_sort(sort:unknown, atom_name:uranio.schema.AtomName):boolean{
	if(typeof sort !== 'object' || !sort || Array.isArray(sort)){
		return false;
	}
	const atom_keys = uranio.core.atom.keys.get_all(atom_name);
	for(const [key, value] of Object.entries(sort)){
		if(!atom_keys.has(key as any) && (Number(value) === 1 || Number(value) === -1)){
			urn_log.warn(`Invalid sort paramter in query string.`);
			return false;
		}
	}
	return true;
}

function _reset_checkbox(allTable:any){
	allTable?.reset_check();
	allTable?.reload_check();
}

/**
 * `query_obj` optional paramter will override `page_query` values
 */
export function query_object(page_query:PageQuery, query_obj?:QueryObject<number>):QueryObject{
	const result:QueryObject = {};
	if(page_query.index != 0){
		result.page = (page_query.index + 1).toString();
	}
	if(page_query.limit){
		result.limit = (page_query.limit).toString();
	}
	if(page_query.sort){
		result.sort = (page_query.sort);
	}
	if(page_query.q !== ''){
		result.q = (page_query.q);
	}
	if(query_obj){
		if(query_obj.page && query_obj.page != '0'){
			result.page = query_obj.page.toString();
		}
		if(query_obj.limit && query_obj.limit != '0'){
			result.limit = query_obj.limit.toString();
		}
		if(query_obj.sort){
			result.sort = query_obj.sort;
		}
		if(query_obj.q && query_obj.q != ''){
			result.q = query_obj.q.toString();
		}
	}
	return result;
}

function _query_string(query_object:QueryObject){
	const query_string = urn_util.url.encode_params(query_object);
	return query_string;
}

export function get_url_query(page_query:PageQuery, query_obj?:QueryObject<number>):string{
	const q_object = query_object(page_query, query_obj);
	const qs = _query_string(q_object);
	return qs;
}

export function get_url(atom_name:string, page_query:PageQuery, query_obj?:QueryObject<number>){
	const qs = get_url_query(page_query, query_obj);
	return `/urn-admin/${atom_name}?${qs}`;
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
