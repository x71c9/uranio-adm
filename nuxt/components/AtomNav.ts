
import Vue from 'vue';

import { atom_book } from "uranio-books/atom";

type NavItem = {
	id: string;
	name: string;
};

type Data = {
	items: NavItem[];
};

type Methods = {
}

type Computed = {
}

type Props = {
}

export default Vue.extend<Data, Methods, Computed, Props>({
	data():Data {
		const items = [];
		for (const atom_name in atom_book) {
			items.push({
				id: atom_name,
				name: atom_name,
			});
		}
		return {
			items
		};
	},
});
