import Vue from 'vue';

import { urn_log } from 'urn-lib';

urn_log.init(
	urn_log.LogLevel.FUNCTION_DEBUG,
	urn_log.LogContext.BROWSER,
	'[URANIO]'
);

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
