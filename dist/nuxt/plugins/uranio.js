"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const urn_lib_1 = require("urn-lib");
urn_lib_1.urn_log.init({
    log_level: urn_lib_1.urn_log.LogLevel.FUNCTION_DEBUG,
    context: urn_lib_1.urn_log.LogContext.BROWSER,
    prefix: '[URANIO]'
});
// export * from './__urn_hooks';
const client_1 = __importDefault(require("uranio/client"));
client_1.default.init();
const vue_1 = __importDefault(require("vue"));
vue_1.default.prototype.$uranio = client_1.default;
//# sourceMappingURL=uranio.js.map