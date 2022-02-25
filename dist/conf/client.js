"use strict";
/**
 * Conf module
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = exports.set_initialize = exports.is_initialized = exports.get = exports.defaults = void 0;
const urn_lib_1 = require("urn-lib");
const urn_exc = urn_lib_1.urn_exception.init('CONF_ADM_CLIENT_MODULE', `Admin client configuration module`);
const client_1 = __importDefault(require("uranio-trx/client"));
const defaults_1 = require("../client/defaults");
Object.defineProperty(exports, "defaults", { enumerable: true, get: function () { return defaults_1.adm_client_config; } });
let _is_client_adm_initialized = false;
function get(param_name) {
    _check_if_uranio_was_initialized();
    _check_if_param_exists(param_name);
    return defaults_1.adm_client_config[param_name];
}
exports.get = get;
function is_initialized() {
    return client_1.default.conf.is_initialized() && _is_client_adm_initialized;
}
exports.is_initialized = is_initialized;
function set_initialize(is_initialized) {
    _is_client_adm_initialized = is_initialized;
}
exports.set_initialize = set_initialize;
function set(repo_config, config) {
    return client_1.default.conf.set(repo_config, config);
}
exports.set = set;
function _check_if_param_exists(param_name) {
    return urn_lib_1.urn_util.object.has_key(defaults_1.adm_client_config, param_name);
}
function _check_if_uranio_was_initialized() {
    if (is_initialized() === false) {
        throw urn_exc.create_not_initialized(`NOT_INITIALIZED`, `Uranio was not initialized. Please run \`uranio.init()\` in your main file.`);
    }
}
//# sourceMappingURL=client.js.map