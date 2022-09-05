
import Vue from 'vue';

import { urn_util } from "uranio-utils";

import uranio from 'uranio/client';

import { Entry } from './UI/Section/SideBarBody';

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
		
		for (const atom_name of uranio.book.get_names()) {
			const atom_def = uranio.book.get_definition(atom_name as uranio.schema.AtomName);
			let plural = `${atom_name}s`;
			if(atom_name === '_setting'){
				continue;
			}
			if(urn_util.object.has_key(atom_def, 'plural') && atom_def.plural){
				plural = atom_def.plural;
			}
			if(atom_def.connection === 'log'){
				items_log.push({
					label: plural.replace(/^_/g, '.'),
					to: `/urn-admin/${atom_name}`,
					icon: `/img/icons/@2x/workspaces-filled-1@2x.png`
				});
			}else{
				items_atom.push({
					label: plural.replace(/^_/,'.'),
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
