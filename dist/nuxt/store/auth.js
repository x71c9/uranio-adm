"use strict";
// import Vue from 'vue';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = exports.mutations = exports.state = void 0;
const urn_lib_1 = require("urn-lib");
const client_1 = __importDefault(require("uranio/client"));
const state = () => ({
    logged: false,
    email: '',
});
exports.state = state;
exports.mutations = {
    CHANGE_LOGGED: (state, logged) => (state.logged = logged),
    CHANGE_EMAIL: (state, email) => (state.email = email),
};
exports.actions = {
    async authenticate(context, { email, password }) {
        if (context.state.logged === true) {
            return {
                email: context.state.email,
                success: true,
                message: 'Already logged.'
            };
        }
        try {
            // 'uranio@uranio.xyz',
            // 'kcXkaF3Ad7KC3G3t'
            const response = await client_1.default.trx.hooks.superusers.authenticate(email, password);
            if (response.success) {
                context.commit('CHANGE_EMAIL', email);
                context.dispatch('update_logged', true);
            }
            else {
                urn_lib_1.urn_log.error('Cannot authenticate');
                urn_lib_1.urn_log.error(response);
            }
            return {
                email: context.state.email,
                success: response.success,
                message: (response.success !== true) ?
                    response.err_msg : (response.message || '')
            };
        }
        catch (e) {
            const err = e;
            return {
                email: context.state.email,
                success: false,
                message: err.message
            };
        }
    },
    async sign_out(context) {
        context.commit('CHANGE_EMAIL', '');
        context.dispatch('update_logged', false);
        return true;
    },
    async check_logged(context) {
        console.log('STORE AUTH CHECK LOGGED');
        const response = await client_1.default.trx.hooks.superusers.count();
        console.log(response);
        let is_authenticated = false;
        if (response.success) {
            context.dispatch('update_logged', true);
            is_authenticated = true;
        }
        else {
            context.dispatch('update_logged', false);
        }
        return is_authenticated;
    },
    update_logged(context, value) {
        console.log('STORE UPDATE LOGGED. logged: ', value);
        context.commit('CHANGE_LOGGED', value);
        // context.dispatch('local_storage/set', {key: 'logged', value: value}, {root:true});
    }
};
//# sourceMappingURL=auth.js.map