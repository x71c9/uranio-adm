"use strict";
/**
 * Init module
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
const uranio_trx_1 = __importDefault(require("uranio-trx"));
const defaults_1 = require("../conf/defaults");
const register = __importStar(require("../reg/server"));
const atoms_1 = require("../atoms");
const conf = __importStar(require("../conf/server"));
const log = __importStar(require("../log/server"));
function init(config) {
    log.init(urn_lib_1.urn_log.defaults);
    /**
     * Register required atoms must go before trx.init
     * so that api.init can add the routes also to adm required
     * atoms.
     */
    _register_required_atoms();
    uranio_trx_1.default.init(config);
    if (typeof config === 'undefined') {
        uranio_trx_1.default.conf.set_from_env(defaults_1.adm_config);
    }
    else {
        uranio_trx_1.default.conf.set(defaults_1.adm_config, config);
    }
    conf.set_initialize(true);
}
exports.init = init;
function _register_required_atoms() {
    for (const [atom_name, atom_def] of Object.entries(atoms_1.atom_book)) {
        register.atom(atom_def, atom_name);
    }
}
//# sourceMappingURL=server.js.map