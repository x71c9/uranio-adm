
import Vue from 'vue';

import uranio from 'uranio';

type Data = {
};

type Methods = {
}

type Computed = {
}

type Props = {
	atoms: uranio.types.Atom<uranio.types.AtomName>[]
	atom_name: uranio.types.AtomName
}

export default Vue.extend<Data, Methods, Computed, Props>({
	inject: [
		'atoms',
		'atom_name'
	],
	props: {
		atoms: Array,
		atom_name: Object
	},
	data():Data {
		console.log(this.atoms);
		console.log(this.atom_name);
		return {
		};
	},
});
