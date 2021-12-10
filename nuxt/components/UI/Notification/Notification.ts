
import Vue from 'vue';

type Data = {
	type: 'info' | 'success' | 'warn' | 'error'
};

type Methods = {
}

type Computed = {
}

type Props = {
}

export default Vue.extend<Data, Methods, Computed, Props>({
	data():Data {
		return {
			type: 'error'
		};
	},
	methods: {
	}
});
