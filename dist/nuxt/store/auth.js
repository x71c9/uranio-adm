"use strict";
// import Vue from 'vue';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = exports.mutations = exports.state = void 0;
const client_1 = __importDefault(require("uranio/client"));
const state = () => ({
    logged: false,
    // token: '',
});
exports.state = state;
// export const getters: GetterTree<RootState, RootState> = {
//   is_open: state => state.is_open,
// };
exports.mutations = {
    CHANGE_LOGGED: (state, logged) => (state.logged = logged),
    // CHANGE_TOKEN: (state, token:string) => (state.token = token),
};
exports.actions = {
    async authenticate(context) {
        if (context.state.logged === true) {
            return;
        }
        try {
            const response = await client_1.default.trx.hooks.superusers.authenticate('uranio@uranio.xyz', 'kcXkaF3Ad7KC3G3t');
            if (response.success) {
                // context.commit('CHANGE_TOKEN', response.payload.token);
                context.commit('CHANGE_LOGGED', true);
            }
            else {
                console.error('Cannot authenticate', response);
            }
        }
        catch (e) {
            console.error(e);
        }
    },
};
//# sourceMappingURL=auth.js.map