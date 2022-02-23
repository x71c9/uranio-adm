import Vue from 'vue';

type Data = Record<string,never>

type Methods = Record<string,never>

type Computed = Record<string,never>

type Props = Record<string,never>


export default Vue.extend<Data, Methods, Computed, Props>({
	data():Data {
		return {
		};
	},
	methods: {
	}
});
