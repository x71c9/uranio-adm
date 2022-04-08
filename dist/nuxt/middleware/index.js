"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let is_init = false;
const global_init_middleware = (context) => {
    if (is_init === false) {
        is_init = true;
        console.log('global_init_middleware', context);
    }
};
exports.default = global_init_middleware;
// export default function ({ store, redirect }) {
//   // If the user is not authenticated
//   if (!store.state.authenticated) {
//     return redirect('/urn-admin/login')
//   }
// }
//# sourceMappingURL=index.js.map