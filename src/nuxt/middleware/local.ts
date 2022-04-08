import { Middleware } from '@nuxt/types';

const local_storage_middleware:Middleware = async (context) => {
	console.log('LOCAL MIDDLEWARRE');
	await context.store.dispatch('localStorage/get', 'logged');
	const local_logged = context.store.state.localStorage.logged;
	console.log('LOCAL MIDDLEWARE local_logged: ', local_logged);
	context.store.dispatch('auth/update_logged', local_logged);
};

export default local_storage_middleware;

// export default function ({ store, redirect }) {
//   // If the user is not authenticated
//   if (!store.state.authenticated) {
//     return redirect('/urn-admin/login')
//   }
// }
