
import Vue from 'vue';

import {RadioItems} from '../../../pages/urn-admin/_slug';

type Data = {
};

type Methods = {
}

type Computed = {
}

type Props = {
	items: RadioItems[]
}

export default Vue.extend<Data, Methods, Computed, Props>({
	props:{
		items: Array
	},
	data():Data {
		return {
		};
	},
});
