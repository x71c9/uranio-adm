
import Vue from 'vue';

import uranio from 'uranio';

import { atom_book } from "uranio-books/atom";

import {Entry} from './UI/Section/SideBarBody';

type Data = {
	items: Entry[];
};

type Methods = {
}

type Computed = {
}

type Props = {
}

export default Vue.extend<Data, Methods, Computed, Props>({
	data():Data {
		const items = [] as Entry[];
		for (const atom_name in atom_book) {
			const atom_def = atom_book[atom_name as keyof typeof atom_book] as
				uranio.types.Book.BasicDefinition;
			const label = atom_def.plural || atom_name;
			items.push({
				label: label.charAt(0).toUpperCase() + label.slice(1),
				to: `/urn-admin/${atom_name}`,
				// icon: `img/icons/@2x/workspaces-filled-1@2x.png`
				icon: `img/icons/svg/filter_none.svg`
			});
		}
		return {
			items
		};
	},
});
