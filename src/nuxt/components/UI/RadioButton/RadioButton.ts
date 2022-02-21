
import Vue from 'vue';

type Data = {
};

type Methods = {
}

type Computed = {
}

type Props = {
	selected: boolean
	disabled: boolean
}

export default Vue.extend<Data, Methods, Computed, Props>({
	props:{
		selected: Boolean,
		disabled: Boolean
	},
	data():Data {
		return {
		};
	},
});
