"use strict";
/**
 * Admin init module
 *
 * @packageDocumentation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const urn_lib_1 = require("urn-lib");
const client_1 = __importDefault(require("uranio-trx/client"));
const register = __importStar(require("../reg/client"));
const required = __importStar(require("../req/client"));
const conf = __importStar(require("../conf/client"));
const env = __importStar(require("../env/client"));
const log = __importStar(require("../log/client"));
const toml_1 = require("../cln/toml");
function init(config, register_required = true) {
    client_1.default.init(config, false);
    client_1.default.conf.set(toml_1.client_toml);
    client_1.default.api.conf.set(toml_1.client_toml);
    client_1.default.core.conf.set(toml_1.client_toml);
    /*
     * The following method must be the last so that service URL can be overwritten
     * with the proxied panel URL.
     */
    conf.set(toml_1.client_toml);
    env.set_client_env();
    if (config) {
        conf.set(config);
    }
    if (register_required) {
        _register_required_atoms();
    }
    _validate_adm_client_variables();
    _validate_adm_client_book();
    log.init(urn_lib_1.urn_log);
    urn_lib_1.urn_log.trace(`Uranio adm client initialization completed.`);
}
exports.init = init;
function _register_required_atoms() {
    const required_atoms = required.get();
    for (const [atom_name, atom_def] of Object.entries(required_atoms)) {
        register.atom(atom_def, atom_name);
    }
}
/**
 * NOTE:
 * Maybe this should be before compilation and not at runtime?
 */
function _validate_adm_client_book() {
    // example function
    // _validate_dock_url_uniqueness();
    // _validate_dock_route_url_uniqueness();
    // _validate_route_name();
}
/**
 * NOTE:
 * Maybe there is no need for this, it is already valid?
 * It depends if the client books have different properties of the server one.
 */
function _validate_adm_client_variables() {
    // example function
}
//# sourceMappingURL=client.js.map