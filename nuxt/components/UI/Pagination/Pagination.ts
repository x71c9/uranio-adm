
import Vue from 'vue';

import {Page} from '../../../pages/urn-admin/_slug';

type Data = {
};

type Methods = {
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
		};
	},
});
