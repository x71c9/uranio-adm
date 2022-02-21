import Vue from 'vue';

import { urn_log } from 'urn-lib';

urn_log.init({
	log_level: urn_log.LogLevel.FUNCTION_DEBUG,
	context: urn_log.LogContext.BROWSER,
	prefix: '[URANIO]'
});

import uranio from 'uranio/client';
uranio.init();

type Data = {
}

type Methods = {
}

type Computed = {

}

type Props = {
}

export default Vue.extend<Data, Methods, Computed, Props>({
	data():Data {
		return {
		};
	},
	methods: {
	}
});
