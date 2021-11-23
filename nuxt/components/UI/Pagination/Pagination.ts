
import Vue from 'vue';

import {Page} from '../../../pages/urn-admin/_slug';

type Data = {
	change_page_value: number
};

type Methods = {
	change_page: () => void
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
		return {
			change_page_value: this.page.index + 1
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
					page: this.change_page_value.toString()
				}
			});
		}
	}
});
