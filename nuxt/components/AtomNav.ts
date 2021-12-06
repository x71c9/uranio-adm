
import Vue from 'vue';

import { urn_util } from "urn-lib";

import uranio from 'uranio';

// import { atom_book } from "uranio-books/atom";

import {Entry} from './UI/Section/SideBarBody';

type Data = {
	items_atom: Entry[]
	items_log: Entry[]
};

type Methods = {
}

type Computed = {
}

type Props = {
}

export default Vue.extend<Data, Methods, Computed, Props>({
	data():Data {
		
		const items_atom = [] as Entry[];
		const items_log = [] as Entry[];
		
		for (const atom_name in uranio.api.book.atom.get_names()) {
			// const atom_def = atom_book[atom_name as keyof typeof atom_book] as
			//   uranio.types.Book.BasicDefinition;
			const atom_def = uranio.api.book.atom.get_definition(atom_name as uranio.types.AtomName);
			let plural = `${atom_name}s`;
			if(urn_util.object.has_key(atom_def, 'plural') && atom_def.plural){
				plural = atom_def.plural;
			}
			if(atom_def.connection === 'log'){
				items_log.push({
					label: plural,
					to: `/urn-admin/${atom_name}`,
					icon: `/img/icons/@2x/workspaces-filled-1@2x.png`
				});
			}else{
				items_atom.push({
					label: plural,
					to: `/urn-admin/${atom_name}`,
					icon: `/img/icons/svg/filter_none.svg`
				});
			}
		}
		return {
			items_atom,
			items_log
		};
	},
});
