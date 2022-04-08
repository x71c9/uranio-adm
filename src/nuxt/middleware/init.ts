import { Middleware } from '@nuxt/types';

let uranio_middleware_is_init = false;

const global_init_middleware:Middleware = async (context) => {
	if(uranio_middleware_is_init === false){
		uranio_middleware_is_init = true;
		await context.store.dispatch('local_storage/init');
		await context.store.dispatch('auth/check_logged');
	}
};

export default global_init_middleware;

// export default function ({ store, redirect }) {
//   // If the user is not authenticated
//   if (!store.state.authenticated) {
//     return redirect('/urn-admin/login')
//   }
// }
