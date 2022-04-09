
export * from '../../client/register';

import {urn_log} from 'urn-lib';
urn_log.init({
	context: urn_log.LogContext.BROWSER,
	prefix: '[URANIO]',
});

import uranio from 'uranio/client';
uranio.init();

import Vue from 'vue';

declare module 'vue/types/vue' {
	interface Vue {
		$uranio: typeof uranio
	}
}

Vue.prototype.$uranio = uranio;
