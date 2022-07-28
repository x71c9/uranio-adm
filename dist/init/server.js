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
const urn_lib_1 = require("urn-lib");
const uranio_trx_1 = __importDefault(require("uranio-trx"));
const register = __importStar(require("../reg/server"));
const required = __importStar(require("../req/server"));
const conf = __importStar(require("../conf/server"));
const env = __importStar(require("../env/server"));
const log = __importStar(require("../log/server"));
function init(config, register_required = true) {
    uranio_trx_1.default.init(config, false);
    conf.set(uranio_trx_1.default.api.core.util.toml.read());
    env.set_env();
    log.init(urn_lib_1.urn_log);
    if (config) {
        conf.set(config);
    }
    if (register_required) {
        _register_required_atoms();
    }
    _validate_adm_variables();
    _validate_adm_book();
    urn_lib_1.urn_log.debug(`Uranio adm initialization completed.`);
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
function _validate_adm_book() {
    // NOTHING TO DO YET
}
function _validate_adm_variables() {
    // NOTHING TO DO YET
}
//# sourceMappingURL=server.js.map