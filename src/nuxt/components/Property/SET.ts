
import mixins from 'vue-typed-mixins';

// import { atom_book } from "uranio-books/atom";

import uranio from "uranio";

import shared from './Shared';

import sortable from './Sortable';

type Data = {
	type: 'number' | 'string'
	new_element: number | string
}

type Methods = {
	remove_element: (element: string | number) => void
	add_element: () => void
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
	
	data():Data{
		
		// const atom_def = atom_book[
		//   this.atom_name as uranio.types.AtomName
		// ] as uranio.types.Book.BasicDefinition;
		
		// const atom_props = atom_def.properties;
		// const atom_prop = atom_props[this.prop_name] as
		//   uranio.types.Book.Definition.Property.Set;
		
		const prop_def = uranio.book.atom.get_property_definition(this.atom_name, this.prop_name) as
			uranio.types.Book.Definition.Property.Set;
		
		const type = (prop_def.type === uranio.types.BookPropertyType.SET_NUMBER) ?
			'number' : 'string';
		
		const new_element = '';
		
		this.drag_group = this.prop_name;
		
		return {
			type,
			new_element
		};
		
	},
	
	methods:{
		
		add_element():void{
			let new_element = this.new_element;
			if(this.type === 'number'){
				new_element = Number(new_element);
			}
			if(new_element !== ''){
				(this.atom as SimpleAtom)[this.prop_name].push(new_element);
				this.new_element = '';
			}
		},
		
		remove_element(element:string|number):void{
			const index = (this.atom as SimpleAtom)[this.prop_name].indexOf(element);
			if(index > -1){
				(this.atom as SimpleAtom)[this.prop_name].splice(index,1);
			}
		}
	},
	
});
