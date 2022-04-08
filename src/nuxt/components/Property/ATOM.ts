
import mixins from 'vue-typed-mixins';

import { urn_log } from 'urn-lib';

// import { atom_book } from "uranio-books/atom";

import uranio from 'uranio/client';

import shared from './Shared';

type Data = {
	prop_atom_name: uranio.schema.AtomName
}

type Methods = {
	remove: () => void
	add: () => void
}

type Computed = {
}

type Props = {
}

export default mixins(shared).extend<Data, Methods, Computed, Props>({
	
	mixins: [shared],
	
	data():Data{
		
		// const prop_name = this.prop_name;
		// const atom_def = atom_book[
		//   this.atom_name as uranio.schema.AtomName
		// ] as uranio.types.Book.BasicDefinition;
		
		// const atom_props = atom_def.properties;
		// const atom_prop = atom_props[prop_name] as
		//   uranio.types.Book.Definition.Property.Atom;
		
		const prop_def = uranio.book.get_property_definition(this.atom_name, this.prop_name) as
			uranio.types.Book.Definition.Property.Atom;
		
		const prop_atom_name = prop_def.atom;
		
		return {
			prop_atom_name,
		};
		
	},
	
	methods:{
		
		remove():void{
			urn_log.debug(this.atom);
			this.$set(this.atom, this.prop_name, '');
			urn_log.debug(this.atom);
		},
		
		add():void{
			this.$store.dispatch('modal_atom/open_modal', {
				prop_name: this.prop_name,
				prop_atom: this.prop_atom_name,
				multiple: false,
				replace: true
			});
		}
		
	}
	
});
