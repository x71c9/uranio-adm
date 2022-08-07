"use strict";
/**
 * Log module
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
exports.init = void 0;
const conf = __importStar(require("../conf/client"));
const env = __importStar(require("../env/client"));
function init(urn_log_lib) {
    urn_log_lib.init({
        log_level: env.get(`log_level`),
        debug_info: conf.get(`log_debug_info`),
        color: conf.get(`log_color`),
        time_format: conf.get(`log_time_format`),
        max_str_length: conf.get(`log_max_str_length`),
        prefix: conf.get(`log_prefix`),
        prefix_loglevel: conf.get(`log_prefix_type`),
    });
}
exports.init = init;
//# sourceMappingURL=client.js.map