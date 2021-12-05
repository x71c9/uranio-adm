import Vue from 'vue';

import { urn_response, urn_log } from "urn-lib";

type Data = {
	message: string
	success: boolean
	error_object:urn_response.Fail<any>
}

type Methods = {
	fail: (trx_response:urn_response.Fail<any>) => void
}

type Computed = {
}

type Props = {
}

export default Vue.extend<Data, Methods, Computed, Props>({
	data():Data{
		return{
			message: '',
			success: false,
			error_object: {} as urn_response.Fail<any>
		}
	},
	methods: {
		fail(trx_response:urn_response.Fail<any>):void{
			window.scrollTo(0, 0);
			urn_log.error('ERR MSG: ', trx_response.err_msg);
			this.success = false;
			this.message = trx_response.message || 'Unknown error';
			const cloned_error = { ...trx_response };
			delete cloned_error.ex;
			this.error_object = cloned_error;
		},
	},
});
