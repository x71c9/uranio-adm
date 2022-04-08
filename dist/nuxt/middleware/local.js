"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const local_storage_middleware = async (context) => {
    // console.log('LOCAL MIDDLEWARRE');
    // await context.store.dispatch('localStorage/get', 'logged');
    // const local_logged = context.store.state.localStorage.logged;
    // console.log('LOCAL MIDDLEWARE local_logged: ', local_logged);
    // context.store.dispatch('auth/update_logged', local_logged);
    console.log('MIDDLEWARE LOCAL STORAGE INIT');
    await context.store.dispatch('localStorage/init');
};
exports.default = local_storage_middleware;
// export default function ({ store, redirect }) {
//   // If the user is not authenticated
//   if (!store.state.authenticated) {
//     return redirect('/urn-admin/login')
//   }
// }
//# sourceMappingURL=local.js.map