
import Vue from 'vue';

// import {urn_util} from 'urn-lib';

import {PageData, PageQuery, get_url, query_object} from '../../../pages/urn-admin/_slug';

type Data = {
	change_page_value: number
	item_per_page_value: number
};

type Methods = {
	change_page: () => void
	change_item_per_page: () => void
	limit_link: (limit:number) => string
}

type Computed = {
	previous_link:string
	next_link:string
	page_links: string[]
}

type Props = {
	page_query: PageQuery
	page_data: PageData
	atom_name: string
}

export default Vue.extend<Data, Methods, Computed, Props>({
	inject: [
		'page_query',
		'page_data',
		'atom_name',
	],
	data():Data {
		return {
			change_page_value: this.page_query.index + 1,
			item_per_page_value: this.page_query.limit,
		};
	},
	methods: {
		change_page():void {
			this.$router.push({
				name: 'urn-admin-slug',
				params: {
					slug: this.atom_name
				},
				query: query_object(this.page_query, {page: this.change_page_value})
			});
		},
		change_item_per_page():void {
			this.$router.push({
				name: 'urn-admin-slug',
				params: {
					slug: this.atom_name
				},
				query: query_object(this.page_query, {page: this.change_page_value, limit: this.item_per_page_value})
			});
		},
		limit_link(limit:number):string{
			return get_url(this.atom_name, this.page_query, {limit: limit});
		}
	},
	computed: {
		previous_link():string{
			const previous_link = get_url(this.atom_name, this.page_query, {page: this.page_query.index});
			return previous_link;
		},
		next_link():string{
			const next_link = get_url(this.atom_name, this.page_query, {page: (this.page_query.index + 2)});
			return next_link;
		},
		page_links():string[]{
			const page_links:string[] = [];
			for(let i = 0; i < this.page_data.total_pages;  i++){
				const page_link = get_url(this.atom_name, this.page_query, {page: (i+1)});
				page_links[i] = page_link;
			}
			return page_links;
		}
	},
});
