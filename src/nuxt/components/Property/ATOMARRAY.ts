
import mixins from 'vue-typed-mixins';

// import { atom_book } from "uranio-books/atom";

import uranio from 'uranio/client';

import shared from './Shared';

import sortable from './Sortable';

type Data = {
	prop_atom_name: uranio.schema.AtomName
}

type Methods = {
	remove: (atom_id:string) => void
	add: () => void
}
type Computed = {
}
type Props = {
}
type SimpleAtom = {
	[k:string]: any
}
export default mixins(shared, sortable).extend<Data, Methods, Computed, Props>({
	
	mixins: [shared, sortable],
	
	data():Data {
		
		// const atom_def = atom_book[
		//   this.atom_name as uranio.schema.AtomName
		// ] as uranio.types.Book.BasicDefinition;
		
		// const atom_props = atom_def.properties;
		// const atom_prop = atom_props[this.prop_name] as
		//   uranio.types.Book.Definition.Property.AtomArray;
		
		const prop_def = uranio.book.get_property_definition(this.atom_name, this.prop_name) as
			uranio.types.Book.Definition.Property.AtomArray;
		
		const prop_atom_name = prop_def.atom;
		
		if(!(this.atom as SimpleAtom)[this.prop_name]){
			this.$set(this.atom, this.prop_name, []);
		}
		
		this.drag_group = this.prop_name;
		
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