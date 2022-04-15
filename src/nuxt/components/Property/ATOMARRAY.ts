
import mixins from 'vue-typed-mixins';

// import { atom_book } from "uranio-books/atom";

import uranio from 'uranio/client';

import shared from './Shared';

import sortable from './Sortable';

type Data = {
	prop_atom_name: uranio.schema.AtomName
	prop_primary_properties: string[]
}

type Methods = {
	remove: (atom_id:string) => void
	add: () => void
}
type Computed = Record<string, never>

type Props = Record<string, never>

type SimpleAtom = {
	[k:string]: any
}
export default mixins(shared, sortable).extend<Data, Methods, Computed, Props>({
	
	mixins: [shared, sortable],
	
	data():Data {
		
		const prop_def = uranio.book.get_property_definition(this.atom_name, this.prop_name) as
			uranio.types.Book.Definition.Property.AtomArray;
		
		const prop_atom_name = prop_def.atom;
		
		if(!(this.molecule as SimpleAtom)[this.prop_name]){
			this.$set(this.molecule, this.prop_name, []);
		}
		
		const prop_primary_properties:string[] = [];
		
		const subatom_prop_defs = uranio.book.get_properties_definition(prop_atom_name);
		for(const [subatom_prop_name, subatom_prop_def] of Object.entries(subatom_prop_defs)){
			if(subatom_prop_def.primary === true){
				prop_primary_properties.push(subatom_prop_name);
			}
		}

		this.drag_group = this.prop_name;
		
		return {
			prop_atom_name,
			prop_primary_properties
		};
		
	},
	
	methods:{
		
		remove(atom_id:string):void{
			const index = (this.molecule as SimpleAtom)[this.prop_name].indexOf(atom_id);
			if(index !== -1){
				(this.molecule as SimpleAtom)[this.prop_name].splice(index, 1);
			}
		},
		
		add():void{
			this.$store.dispatch('modal_atom/open_modal', {
				prop_name: this.prop_name,
				prop_atom: this.prop_atom_name,
				multiple: true,
				replace: false
			});
		}
		
	},
	
});
