
import Vue from 'vue';

import { atom_book } from "uranio-books/atom";

import uranio from "uranio";

type Data = {
	// atom: uranio.types.Atom<uranio.types.AtomName>
	// prop_name: string,
	prop_atom_name: uranio.types.AtomName
}

type Methods = {
	remove: () => void
	add: () => void
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
	],
	
	data():Data{
		
		const prop_name = this.prop_name;
		const atom_def = atom_book[
			this.atom_name as uranio.types.AtomName
		] as uranio.types.Book.BasicDefinition;
		
		const atom_props = atom_def.properties;
		const atom_prop = atom_props[prop_name] as
			uranio.types.Book.Definition.Property.Atom;
		
		const prop_atom_name = atom_prop.atom;
		
		return {
			prop_atom_name,
		};
		
	},
	
	methods:{
		
		remove():void{
			console.log(this.atom);
			this.$set(this.atom, this.prop_name, '');
			console.log(this.atom);
		},
		
		add():void{
			this.$store.dispatch('modalAtom/open_modal', {
				prop_name: this.prop_name,
				prop_atom: this.prop_atom_name,
				multiple: false,
				replace: true
			});
		}
		
	}
	
});
