
export * from '../../client/register';

import uranio from 'uranio/client';
uranio.init();

import Vue from 'vue';

declare module 'vue/types/vue' {
	interface Vue {
		$uranio: typeof uranio
	}
}

Vue.prototype.$uranio = uranio;
