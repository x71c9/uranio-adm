import mixins from 'vue-typed-mixins';

import uranio from 'uranio';

// import {atom_book} from 'uranio-books/atom';

import shared from './Shared';

type Data = {
	step: number
}

type Methods = {
	on_input: (event:Event) => void
}

type Computed = {
	value: string
}

type Props = {
}

type SimpleAtom = {
	[k:string]: any
}

export default mixins(shared).extend<Data, Methods, Computed, Props>({

	mixins: [shared],
	
	data():Data {
		
		// const atom_name = this.atom_name as uranio.types.AtomName;
		// const atom_def = atom_book[atom_name] as uranio.types.Book.BasicDefinition;
		
		// const atom_prop = atom_def.properties[this.prop_name] as
		//   uranio.types.Book.Definition.Property.Float;
		
		const prop_def = uranio.api.book.atom.get_property_definition(this.atom_name, this.prop_name) as
			uranio.types.Book.Definition.Property.Float;
		
		let step = 0.01;
		
		if(prop_def.format && prop_def.format.decimal){
			
			const decimal = parseInt(prop_def.format.decimal.toString());
			
			if(decimal <= 0){
				step = 1;
			}else{
				const pow = Math.pow(10, decimal);
				step = 1 / pow;
			}
		}
		
		return {
			step
		};
		
	},
	computed:{
		
		value():string{
			
			let value = (this.atom as SimpleAtom)[this.prop_name];
			
			// const atom_name = this.atom_name as uranio.types.AtomName;
			// const atom_def = atom_book[atom_name] as uranio.types.Book.BasicDefinition;
			
			// const atom_prop = atom_def.properties[this.prop_name] as
			//   uranio.types.Book.Definition.Property.Float;
			
			const prop_def = uranio.api.book.atom.get_property_definition(this.atom_name, this.prop_name) as
				uranio.types.Book.Definition.Property.Float;
		
			if(prop_def.format && prop_def.format.decimal){
				const decimal = parseInt(prop_def.format.decimal.toString());
				if(typeof value === 'number'){
					value = value.toFixed(decimal);
				}
			}
			
			return value;
			
		}
	},
	
	methods:{
		
		on_input(event:Event):void{
			const target = event.target as HTMLInputElement;
			(this.atom as SimpleAtom)[this.prop_name] = parseFloat(target.value);
		}
		
	}
});
