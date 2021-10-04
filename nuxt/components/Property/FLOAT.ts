import Vue from 'vue';

import uranio from 'uranio';

import {atom_book} from 'uranio-books/atom';

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
		
		const atom_name = this.atom_name as uranio.types.AtomName;
		const atom_def = atom_book[atom_name] as uranio.types.Book.BasicDefinition;
		
		const atom_prop = atom_def.properties[this.prop_name] as
			uranio.types.Book.Definition.Property.Float;
		
		let step = 0.01;
		
		if(atom_prop.format && atom_prop.format.decimal){
			
			const decimal = parseInt(atom_prop.format.decimal.toString());
			
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
			
			const atom_name = this.atom_name as uranio.types.AtomName;
			const atom_def = atom_book[atom_name] as uranio.types.Book.BasicDefinition;
			
			const atom_prop = atom_def.properties[this.prop_name] as
				uranio.types.Book.Definition.Property.Float;
			
			if(atom_prop.format && atom_prop.format.decimal){
				const decimal = parseInt(atom_prop.format.decimal.toString());
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
