"use strict";
/**
 * Conf module
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all = exports.set = exports.get = void 0;
const urn_lib_1 = require("urn-lib");
const defaults_1 = require("./defaults");
const env = __importStar(require("../env/server"));
const urn_ctx = urn_lib_1.urn_context.create(defaults_1.adm_config, env.is_production(), 'ADM:CONF');
function get(param_name) {
    return urn_ctx.get(param_name);
}
exports.get = get;
function set(config) {
    urn_ctx.set(config);
}
exports.set = set;
function get_all() {
    return urn_ctx.get_all();
}
exports.get_all = get_all;
//# sourceMappingURL=server.js.map