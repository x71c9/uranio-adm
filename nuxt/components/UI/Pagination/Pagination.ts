
import Vue from 'vue';

import {Page} from '../../../pages/urn-admin/_slug';

type Data = {
	change_page_value: number
	item_per_page_value: number
};

type Methods = {
	change_page: () => void
	change_item_per_page: () => void
}

type Computed = {
}

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
		console.log(this.page.total_page_num);
		return {
			change_page_value: this.page.index + 1,
			item_per_page_value: this.page.query_limit
		};
	},
	methods: {
		change_page():void {
			this.$router.push({
				name: 'urn-admin-slug',
				params: {
					slug: this.atom_name
				},
				query: {
					page: this.change_page_value.toString(),
					limit: this.page.query_limit.toString(),
					sort: this.page.sort_by as any
				}
			});
		},
		change_item_per_page():void {
			this.$router.push({
				name: 'urn-admin-slug',
				params: {
					slug: this.atom_name
				},
				query: {
					page: this.change_page_value.toString(),
					limit: this.item_per_page_value.toString(),
					sort: this.page.sort_by as any
				}
			});
		}
	}
});
