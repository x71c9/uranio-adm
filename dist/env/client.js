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
exports.is_production = exports.set = exports.set_from_env = exports.set_initialize = exports.is_initialized = exports.get_current = exports.get = exports.defaults = void 0;
const urn_lib_1 = require("urn-lib");
const urn_exc = urn_lib_1.urn_exception.init('ADM_ENV_CLIENT_MODULE', `Admin client environment module`);
const client_1 = __importDefault(require("uranio-trx/client"));
const default_env_1 = require("../client/default_env");
Object.defineProperty(exports, "defaults", { enumerable: true, get: function () { return default_env_1.adm_client_env; } });
let _is_client_adm_initialized = false;
function get(param_name) {
    _check_if_uranio_was_initialized();
    _check_if_param_exists(param_name);
    return default_env_1.adm_client_env[param_name];
}
exports.get = get;
function get_current(param_name) {
    return client_1.default.env.get_current(param_name);
}
exports.get_current = get_current;
function is_initialized() {
    return client_1.default.env.is_initialized() && _is_client_adm_initialized;
}
exports.is_initialized = is_initialized;
function set_initialize(is_initialized) {
    _is_client_adm_initialized = is_initialized;
}
exports.set_initialize = set_initialize;
function set_from_env(repo_env) {
    return client_1.default.env.set_from_env(repo_env);
}
exports.set_from_env = set_from_env;
function set(repo_env, config) {
    return client_1.default.env.set(repo_env, config);
}
exports.set = set;
function is_production() {
    return client_1.default.env.is_production();
}
exports.is_production = is_production;
function _check_if_param_exists(param_name) {
    return urn_lib_1.urn_util.object.has_key(default_env_1.adm_client_env, param_name);
}
function _check_if_uranio_was_initialized() {
    if (is_initialized() === false) {
        throw urn_exc.create_not_initialized(`NOT_INITIALIZED`, `Uranio was not initialized. Please run \`uranio.init()\` in your main file.`);
    }
}
//# sourceMappingURL=client.js.map