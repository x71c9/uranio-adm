
import Vue from 'vue';

import uranio from 'uranio/client';

import { urn_util } from "urn-lib";

import { Entry } from '../../UI/Section/SideBarBody';

type Data = {
	items: Entry[]
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
		
		for (const atom_name of uranio.book.get_names()) {
			const atom_def = uranio.book.get_definition(atom_name as uranio.schema.AtomName);
			let plural = `${atom_name}s`;
			if(atom_name !== 'setting'){
				continue;
			}
			if(urn_util.object.has_key(atom_def, 'plural') && atom_def.plural){
				plural = atom_def.plural;
			}
			items.push({
				label: plural,
				to: `/urn-admin/${atom_name}`,
				icon: `/img/icons/png/settings.png`
			});
		}
		return {
			items
		};
	},
});
