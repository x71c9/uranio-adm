
import Vue from 'vue';

import uranio from 'uranio';

type Data = {
}

type Methods = {
}

type Computed = {
}

type Props = {
	atom: uranio.types.Atom<uranio.types.AtomName>
	atom_name: uranio.types.AtomName
	prop_name: string
	prop_type: string
	focus: boolean
}

export default Vue.extend<Data, Methods, Computed, Props>({
	inject: [
		'atom',
		'atom_name',
		'prop_name',
		'prop_type'
	],
	props: {
		atom: Object,
		atom_name: String as () => uranio.types.AtomName,
		prop_name: String,
		prop_type: String,
		focus: Boolean
	},
	watch:{
		focus(new_value:boolean, _old_value:boolean):void{
			const $input = this.$refs['input'] as HTMLElement;
			if(new_value === true && $input.focus){
				$input.focus();
			}
			if((this.$el as HTMLElement).offsetTop){
				const top = (this.$el as HTMLElement).offsetTop - 48;
				window.scrollTo(0, top);
			}
		}
	},
});
