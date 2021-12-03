
import Vue from 'vue';

type Data = {
};

type Methods = {
}

type Computed = {
}

type Props = {
	data: any
}

export default Vue.extend<Data, Methods, Computed, Props>({
	props:{
		data: Array
	},
	data():Data {
		return {
		};
	},
});
