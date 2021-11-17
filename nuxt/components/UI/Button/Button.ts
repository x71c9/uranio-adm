
import Vue from 'vue';

type Data = {
	label:string
};

type Methods = {
}

type Computed = {
}

type Props = {
}

export default Vue.extend<Data, Methods, Computed, Props>({
	data():Data {
		const label = 'Button';
		return {
			label
		};
	},
});
