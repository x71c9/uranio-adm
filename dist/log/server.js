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
// import trx from 'uranio-trx';
const conf = __importStar(require("../conf/server"));
const env = __importStar(require("../env/server"));
function init(urn_log_lib) {
    // return trx.log.init(urn_log_lib);
    urn_log_lib.init({
        log_level: env.get_current(`log_level`),
        debug_info: conf.get_current(`log_debug_info`),
        color: conf.get_current(`log_color`),
        time_format: conf.get_current(`log_time_format`),
        max_str_length: conf.get_current(`log_max_str_length`),
        prefix: conf.get_current(`log_prefix`),
        prefix_type: conf.get_current(`log_prefix_type`),
    });
}
exports.init = init;
// export function init(log_config?: urn_log.LogLevel):void
// export function init(log_config?: urn_log.LogConfig):void
// export function init(log_config?: urn_log.LogConfig | urn_log.LogLevel):void{
//   /**
//    * This "if else" is needed otherwise Typescript will complain
//    * the overloads don't match.
//    */
//   if(typeof log_config === 'number'){
//     trx.log.init(log_config);
//     urn_log.init(log_config);
//   }else{
//     trx.log.init(log_config);
//     urn_log.init(log_config);
//   }
// }
//# sourceMappingURL=server.js.map