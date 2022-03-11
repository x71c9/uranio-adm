
import uranio from 'uranio/client';
uranio.init();

console.log(uranio.conf.get_all());

import Vue from 'vue';

declare module 'vue/types/vue' {
	interface Vue {
		$uranio: typeof uranio
	}
}

Vue.prototype.$uranio = uranio;
