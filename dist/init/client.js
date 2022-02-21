"use strict";
/**
 * Init module
 *
 * @packageDocumentation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const client_1 = __importDefault(require("uranio-trx/client"));
// import {trx_client_config} from 'uranio-trx/cln/defaults';
const defaults_1 = require("../cln/defaults");
const conf = __importStar(require("../conf/client"));
const defaults_2 = require("uranio-trx/raw/defaults");
function init(config) {
    client_1.default.init(config);
    if (typeof config === 'undefined') {
        client_1.default.conf.set_from_env(defaults_1.adm_client_config);
    }
    else {
        client_1.default.conf.set(defaults_1.adm_client_config, config);
    }
    if (process.env.NETLIFY_DEV) {
        defaults_2.raw_config.service_url = `http://localhost:7777/uranio/api`;
    }
    else if (process.env.NETLIFY) {
        defaults_2.raw_config.service_url = `${process.env.URL}/uranio/api`;
    }
    _validate_adm_client_variables();
    _validate_adm_client_book();
    conf.set_initialize(true);
}
exports.init = init;
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