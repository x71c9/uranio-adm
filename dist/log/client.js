"use strict";
/**
 * Log module
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const client_1 = __importDefault(require("uranio-trx/client"));
function init(urn_log_lib) {
    return client_1.default.log.init(urn_log_lib);
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
//     trx_client.log.init(log_config);
//     urn_log.init(log_config);
//   }else{
//     trx_client.log.init(log_config);
//     urn_log.init(log_config);
//   }
// }
//# sourceMappingURL=client.js.map