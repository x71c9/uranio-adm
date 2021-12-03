
import Vue from 'vue';

type Data = {
};

type Methods = {
}

type Computed = {
}

type Props = {
	obj: any
}

export default Vue.extend<Data, Methods, Computed, Props>({
	props:{
		obj: Object
	},
	data():Data {
		console.log(this.obj);
		return {
		};
	},
});
