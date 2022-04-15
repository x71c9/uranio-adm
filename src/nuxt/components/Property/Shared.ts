
import Vue from 'vue';

import uranio from 'uranio/client';

type Data = Record<string, never>

type Methods = Record<string, never>

type Computed = Record<string, never>

type Props = {
	molecule: uranio.schema.Molecule<uranio.schema.AtomName, uranio.schema.Depth>
	atom_name: uranio.schema.AtomName
	prop_name: keyof uranio.schema.Molecule<uranio.schema.AtomName>
	prop_type: string
	focus: boolean
}

export default Vue.extend<Data, Methods, Computed, Props>({
	inject: [
		'molecule',
		'atom_name',
		'prop_name',
		'prop_type'
	],
	props: {
		molecule: Object,
		atom_name: String as () => uranio.schema.AtomName,
		prop_name: String as () => keyof uranio.schema.Molecule<uranio.schema.AtomName>,
		prop_type: String,
		focus: Boolean
	},
	watch:{
		focus(new_value:boolean, _old_value:boolean):void{
			const $input = this.$refs['input'] as HTMLElement;
			if(new_value === true && $input && $input.focus){
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
