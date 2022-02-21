
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
	prop_name: keyof uranio.types.Molecule<uranio.types.AtomName>
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
		prop_name: String as () => keyof uranio.types.Molecule<uranio.types.AtomName>,
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
				const top = (this.$el as HTMLElement).offsetTop - 34;
				if(!check_if_element_is_visible(this.$el as HTMLElement)){
					window.scrollTo(0, top);
				}
			}
		}
	},
});

export function check_if_element_is_visible(el:HTMLElement):boolean{
	const rect = el.getBoundingClientRect();
	const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
	// console.log(!(rect.bottom < 0 || rect.top - viewHeight >= 0));
	return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}
