
import mixins from 'vue-typed-mixins';

// import { atom_book } from "uranio-books/atom";

import uranio from 'uranio/client';

import shared from './Shared';

import sortable from './Sortable';

type Data = {
	prop_atom_name: uranio.schema.AtomName
	prop_primary_properties: string[]
	rerender_key: number
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
			prop_primary_properties,
			rerender_key: 0
		};
		
	},
	
	methods:{
		
		remove<A extends uranio.schema.AtomName>(atom_id:string):void{
			const atoms_array = this.molecule[this.prop_name] as unknown as uranio.schema.Atom<A>[];
			if(!Array.isArray(atoms_array)){
				return;
			}
			for(let i = 0; i < atoms_array.length; i++){
				if(atoms_array[i]._id === atom_id){
					atoms_array.splice(i, 1);
					break;
				}
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
