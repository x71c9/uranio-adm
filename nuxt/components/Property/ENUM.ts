
import Vue from 'vue';

import { atom_book } from "uranio-books/atom";

import uranio from "uranio";

type EnumNS =
	uranio.types.BookPropertyType.ENUM_NUMBER |
	uranio.types.BookPropertyType.ENUM_STRING;

type EnumNSValues<T extends EnumNS> =
	T extends uranio.types.BookPropertyType.ENUM_NUMBER ?
	number[] : string[];

type Data<T extends EnumNS> = {
	// atom: uranio.types.Atom<uranio.types.AtomName>
	// prop_name: string,
	enum_values: EnumNSValues<T>,
	enum_type: T
}

type Methods = {
	on_change: (event:Event) => void
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

export default Vue.extend<Data<EnumNS>, Methods, Computed, Props>({
	
	inject: [
		'atom',
		'atom_name',
		'prop_name',
		'prop_type'
	],
	
	data<T extends EnumNS>():Data<T> {
		
		const atom_def = atom_book[
			this.atom_name as uranio.types.AtomName
		] as uranio.types.Book.BasicDefinition;
		
		const atom_props = atom_def.properties;
		const atom_prop = atom_props[this.prop_name] as
			uranio.types.Book.Definition.Property.Enum;
		
		const enum_values = atom_prop.values as EnumNSValues<T>;
		const enum_type = atom_prop.type as T;
		
		return {
			enum_values,
			enum_type
		};
		
	},
	
	methods:{
		
		on_change(event:Event):void{
			
			const target = event.target as HTMLInputElement;
			
			let target_value = target.value as any;
			if(this.enum_type === uranio.types.BookPropertyType.ENUM_NUMBER){
				target_value = Number(target_value);
			}
			
			(this.atom as SimpleAtom)[this.prop_name] = target_value;
		}
		
	}
	
});
