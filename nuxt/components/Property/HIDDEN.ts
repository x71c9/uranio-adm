
import Vue from 'vue';

import uranio from 'uranio';

type Data = {
}

type Methods = {
}

type Computed = {
}

type Props = {
	atom: uranio.types.Atom<uranio.types.AtomName>
	atom_name: uranio.types.AtomName
	prop_name: string,
	prop_type: string
}

// type SimpleAtom = {
//   [k:string]: any
// }

export default Vue.extend<Data, Methods, Computed, Props>({
	inject: [
		'atom',
		'atom_name',
		'prop_name',
		'prop_type'
	]
});
