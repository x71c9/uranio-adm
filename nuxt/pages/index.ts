import Vue from 'vue';

type Data = {
	name: string
}

export default Vue.extend<Data, never, never, 'name'>({
	data():Data {
		return {
			name: 'URANIO'
		};
	}
});
