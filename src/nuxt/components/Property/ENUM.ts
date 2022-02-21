
import mixins from 'vue-typed-mixins';

import uranio from 'uranio/client';

import shared from './Shared';

type EnumNS =
	uranio.types.PropertyType.ENUM_NUMBER |
	uranio.types.PropertyType.ENUM_STRING;

type EnumNSValues<T extends EnumNS> =
	T extends uranio.types.PropertyType.ENUM_NUMBER ?
	number[] : string[];

type Data<T extends EnumNS> = {
	enum_values: EnumNSValues<T>,
	enum_type: T
	prop_label: string
}

type Methods = {
	on_change: (event:Event) => void
}

type Computed = {
}

type Props = {
}

// type SimpleAtom = {
//   [k:string]: any
// }

export default mixins(shared).extend<Data<EnumNS>, Methods, Computed, Props>({
	
	mixins: [shared],
	
	data<T extends EnumNS>():Data<T> {
		
		const prop_def = uranio.book.get_property_definition(this.atom_name, this.prop_name);
		
		const enum_values = (prop_def as uranio.types.Book.Definition.Property.Enum).values as EnumNSValues<T>;
		
		const enum_type = prop_def.type as T;
		
		let prop_label = this.prop_name as string;
		
		if(prop_def.label){
			prop_label = prop_def.label;
		}
		
		return {
			enum_values,
			enum_type,
			prop_label
		};
		
	},
	
	methods:{
		
		on_change(event:Event):void{
			
			const target = event.target as HTMLInputElement;
			
			let target_value = target.value as any;
			if(this.enum_type === uranio.types.PropertyType.ENUM_NUMBER){
				target_value = Number(target_value);
			}
			
			// (this.atom as SimpleAtom)[this.prop_name] = target_value;
			this.atom[this.prop_name] = target_value;
		}
		
	}
	
});
