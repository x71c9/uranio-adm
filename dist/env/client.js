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
exports.set_env = exports.set = exports.get_all = exports.get = exports.is_production = void 0;
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
function set_env() {
    urn_ctx.set_env();
}
exports.set_env = set_env;
//# sourceMappingURL=client.js.map