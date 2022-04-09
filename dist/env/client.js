"use strict";
/**
 * Env module
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.set_client_env = exports.set = exports.get_all = exports.get = exports.is_production = void 0;
const urn_lib_1 = require("urn-lib");
const client_1 = __importDefault(require("uranio-trx/client"));
const default_env_1 = require("../client/default_env");
const urn_ctx = urn_lib_1.urn_context.create(default_env_1.adm_client_env, is_production(), 'ADM:ENV:CLIENT');
function is_production() {
    return client_1.default.env.is_production();
}
exports.is_production = is_production;
function get(param_name) {
    return urn_ctx.get(param_name);
}
exports.get = get;
function get_all() {
    return urn_ctx.get_all();
}
exports.get_all = get_all;
function set(env) {
    urn_ctx.set(env);
}
exports.set = set;
function set_client_env() {
    // Cannot set env as normal because on the browser it is not possible to
    // iterate on the object process.env. Also it is not possible to dynamically
    // assign values to process.env keys. Instead the only way to get value from
    // process.env in the browser is to manually type the key in string like
    // process.env['URN_LOG_LEVEL']
    //
    // Check core/env/client.ts for reference on how to implement this method.
    // urn_ctx.set_env();
    const trx_env = client_1.default.env.set_client_env();
    set(trx_env);
    return trx_env;
}
exports.set_client_env = set_client_env;
//# sourceMappingURL=client.js.map