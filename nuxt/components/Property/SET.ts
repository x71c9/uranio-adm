
import Vue from 'vue';

import { atom_book } from "uranio-books/atom";

import uranio from "uranio";

type Data = {
	// atom: uranio.types.Atom<uranio.types.AtomName>
	// prop_name: string
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
	
	data():Data{
		
		const atom_def = atom_book[
			this.atom_name as uranio.types.AtomName
		] as uranio.types.Book.BasicDefinition;
		
		const atom_props = atom_def.properties;
		const atom_prop = atom_props[this.prop_name] as
			uranio.types.Book.Definition.Property.Set;
		
		const type = (atom_prop.type === uranio.types.BookPropertyType.SET_NUMBER) ?
			'number' : 'string';
		
		const new_element = '';
		
		return {
			type,
			new_element
		};
		
	},
	
	computed:{
		
		value():string{
			
			let value = (this.atom as SimpleAtom)[this.prop_name];
			if(!value){
				value = [];
			}
			
			return value;
		}
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
