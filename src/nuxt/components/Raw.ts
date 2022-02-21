
import Vue from 'vue';

type Data = {
	open: boolean
};

type Methods = {
}

type Computed = {
}

type Props = {
	data: any
}

export default Vue.extend<Data, Methods, Computed, Props>({
	props: {
		data: Object
	},
	data(): Data{
		return{
			open: true
		};
	}
});
