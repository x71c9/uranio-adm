"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware = (context) => {
    console.log('AUTH MIDDLEWARE', context.store.state.auth.logged);
    const login_path = `/urn-admin/login`;
    if (context.store.state.auth.logged !== true && context.route.path !== login_path) {
        return context.redirect(login_path);
    }
};
exports.default = auth_middleware;
// export default function ({ store, redirect }) {
//   // If the user is not authenticated
//   if (!store.state.authenticated) {
//     return redirect('/urn-admin/login')
//   }
// }
//# sourceMappingURL=auth.js.map