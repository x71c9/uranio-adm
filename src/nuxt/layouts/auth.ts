import Vue from 'vue';

type Data = Record<string,never>

type Methods = Record<string,never>

type Computed = Record<string,never>

type Props = Record<string,never>


export default Vue.extend<Data, Methods, Computed, Props>({
	head() {
		return {
			bodyAttrs: {
				class: 'uranio layout-auth'
			}
		};
	},
	data():Data {
		return {
		};
	},
	methods: {
	}
});
