import { Middleware } from '@nuxt/types';

const myMiddleware:Middleware = (context) => {
	const login_path = `/urn-admin/login`;
	if(context.store.state.auth.logged !== true && context.route.path !== login_path){
		// return context.redirect(login_path);
	}
};

export default myMiddleware;

// export default function ({ store, redirect }) {
//   // If the user is not authenticated
//   if (!store.state.authenticated) {
//     return redirect('/urn-admin/login')
//   }
// }
