
import Vue from 'vue';

import { atom_book } from "uranio-books/atom";

import uranio from 'uranio';

type Data = {
	prop_atom_name: uranio.types.AtomName
}

type Methods = {
	remove: (atom_id:string) => void
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

type SimpleAtom = {
	[k:string]: any
}

export default Vue.extend<Data, Methods, Computed, Props>({
	
	inject: [
		'atom',
		'atom_name',
		'prop_name',
		'prop_type'
	],
	
	data():Data {
		
		const atom_def = atom_book[
			this.atom_name as uranio.types.AtomName
		] as uranio.types.Book.BasicDefinition;
		
		const atom_props = atom_def.properties;
		const atom_prop = atom_props[this.prop_name] as
			uranio.types.Book.Definition.Property.AtomArray;
		
		const prop_atom_name = atom_prop.atom;
		
		if(!(this.atom as SimpleAtom)[this.prop_name]){
			this.$set(this.atom, this.prop_name, []);
		}
		
		return {
			prop_atom_name,
		};
		
	},
	
	methods:{
		
		remove(atom_id:string):void{
			const index = (this.atom as SimpleAtom)[this.prop_name].indexOf(atom_id);
			if(index !== -1){
				(this.atom as SimpleAtom)[this.prop_name].splice(index, 1);
			}
		},
		
		add():void{
			this.$store.dispatch('modalAtom/open_modal', {
				prop_name: this.prop_name,
				prop_atom: this.prop_atom_name,
				multiple: true,
				replace: false
			});
		}
		
	},
	
});
