
import Vue from 'vue';

type Data = {
	// is_checked: boolean
	// is_disabled: boolean
	// is_indeterminate: boolean
};

type Methods = {
	toggle: () => void
}

type Computed = {
}

type Props = {
	checked: boolean
	disabled: boolean
	indeterminate: boolean
}

export default Vue.extend<Data, Methods, Computed, Props>({
	props:{
		checked: Boolean,
		disabled: Boolean,
		indeterminate: Boolean
	},
	data():Data {
		return {
			// is_checked: this.checked,
			// is_disabled: this.disabled,
			// is_indeterminate: this.indeterminate
		};
	},
	methods:{
		toggle(){
			// if(this.is_disabled === true){
			//   return;
			// }
			// if(this.is_checked === true){
			//   this.is_checked = false;
			//   this.is_indeterminate = false;
			// }else{
			//   this.is_checked = true;
			// }
		}
	}
});
