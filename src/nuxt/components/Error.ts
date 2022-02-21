
import Vue from 'vue';

type Data = {
};

type Methods = {
}

type Computed = {
}

type Props = {
	error: any
	message: string
}

export default Vue.extend<Data, Methods, Computed, Props>({
	props: {
		error: Object,
		message: String
	},
	data(): Data{
		return{
		};
	}
});
