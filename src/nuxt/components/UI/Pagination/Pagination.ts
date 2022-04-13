
import Vue from 'vue';

import {urn_util} from 'urn-lib';

import {Page, PageQuery} from '../../../pages/urn-admin/_slug';

type Data = {
	change_page_value: number
	item_per_page_value: number
	previous_link: string
	next_link: string
	page_links: string[]
};

type Methods = {
	change_page: () => void
	change_item_per_page: () => void
}

type Computed = Record<string, never>

type Props = {
	page: Page
	atom_name: string
}

export default Vue.extend<Data, Methods, Computed, Props>({
	inject: [
		'page',
		'atom_name'
	],
	data():Data {
		
		const previous_link = _index_url(this.page.index, this.page, this.atom_name);
		const next_link = _index_url(this.page.index + 2, this.page, this.atom_name);
		
		const page_links:string[] = [];
		for(let i = 0; i < this.page.total_page_num;  i++){
			const page_link = _index_url(i + 1, this.page, this.atom_name);
			page_links[i] = page_link;
		}
		
		return {
			change_page_value: this.page.index + 1,
			item_per_page_value: this.page.query_limit,
			previous_link,
			next_link,
			page_links
		};
	},
	methods: {
		change_page():void {
			this.$router.push({
				name: 'urn-admin-slug',
				params: {
					slug: this.atom_name
				},
				query: _get_query(this.page, this.change_page_value, this.item_per_page_value)
			});
		},
		change_item_per_page():void {
			this.$router.push({
				name: 'urn-admin-slug',
				params: {
					slug: this.atom_name
				},
				query: _get_query(this.page, this.change_page_value, this.item_per_page_value)
			});
		}
	}
});

function _get_query(page:Page, page_value:number, item_per_page:number){
	const query_object:Partial<PageQuery<string,any>> = {
		page: page_value.toString(),
		limit: item_per_page.toString(),
		sort: page.sort_by,
	};
	if(page.search_query && page.search_query !== ''){
		query_object.q = page.search_query;
	}
	return query_object;
}

function _index_url(index:number, page:Page, atom_name:string){
	const query_string = _query_string(page, index);
	return `/urn-admin/${atom_name}?${query_string}`;
}

function _query_string(page:Page, index:number){
	const has_search_query = (page.search_query && page.search_query !== '');
	const params:Partial<PageQuery<string, any>> = {
		page: index.toString(),
		limit: page.query_limit.toString(),
		sort: page.sort_by
	};
	if(has_search_query){
		params.q = page.search_query;
	}
	const query_string = urn_util.url.encode_params(params);
	return query_string;
}
