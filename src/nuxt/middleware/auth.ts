import { Middleware } from '@nuxt/types';

const auth_middleware:Middleware = (context) => {
	console.log('AUTH MIDDLEWARE', context.store.state.auth.logged);
	const login_path = `/urn-admin/login`;
	if(context.store.state.auth.logged !== true && context.route.path !== login_path){
		return context.redirect(login_path);
	}
};

export default auth_middleware;

// export default function ({ store, redirect }) {
//   // If the user is not authenticated
//   if (!store.state.authenticated) {
//     return redirect('/urn-admin/login')
//   }
// }
