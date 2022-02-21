
import Vue from 'vue';

import shared from './Shared';

type Data = {
	readonly: boolean
}

type Methods = {
}

type Computed = {
}

type Props = {
}

export default Vue.extend<Data, Methods, Computed, Props>({
	mixins: [shared],
	data():Data{
		return {
			readonly: true
		};
	},
	mounted: function () {
		setTimeout(() => {
			this.readonly = false;
		}, 1000);
	}
});
