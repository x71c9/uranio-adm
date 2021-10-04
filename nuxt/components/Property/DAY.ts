
import Vue from 'vue';

import dateformat from 'dateformat';

import uranio from 'uranio';

type Data = {
	// atom: uranio.types.Atom<uranio.types.AtomName>
	// prop_name: string
}

type Methods = {
	on_input: (event:Event) => void
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
	
	data():Data {
		// const atom = this.atom;
		// const prop_name = this.prop_name;
		// return {
		//   atom,
		//   prop_name
		// };
		return {};
	},
	
	computed:{
		value():string{
			let value = '';
			const date_string = (this.atom as SimpleAtom)[this.prop_name];
			if(typeof date_string === 'string' && date_string !== ''){
				value = dateformat(new Date(date_string),"yyyy-mm-dd");
			}
			return value;
		}
	},
	
	methods:{
		on_input(event:Event):void{
			const target = event.target as HTMLInputElement;
			(this.atom as SimpleAtom)[this.prop_name] = target.value;
		}
	},
	
});
