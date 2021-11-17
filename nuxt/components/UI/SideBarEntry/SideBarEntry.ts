
import Vue from 'vue';

import {Entry} from '../Section/SideBarBody';

type Data = {
};

type Methods = {
}

type Computed = {
}

type Props = {
	entry:Entry
}

export default Vue.extend<Data, Methods, Computed, Props>({
	props:{
		entry: Object
	},
	data():Data {
		return {
		};
	},
});
