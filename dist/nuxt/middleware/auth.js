"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myMiddleware = (context) => {
    const login_path = `/urn-admin/login`;
    if (context.store.state.auth.logged !== true && context.route.path !== login_path) {
        console.log(context.store.state.auth);
        return context.redirect(login_path);
    }
};
exports.default = myMiddleware;
// export default function ({ store, redirect }) {
//   // If the user is not authenticated
//   if (!store.state.authenticated) {
//     return redirect('/urn-admin/login')
//   }
// }
//# sourceMappingURL=auth.js.map