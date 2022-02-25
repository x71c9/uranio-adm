"use strict";
/**
 * TRX run module
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const urn_lib_1 = require("urn-lib");
urn_lib_1.urn_log.init({
    log_level: urn_lib_1.urn_log.LogLevel.FUNCTION_DEBUG
});
__exportStar(require("./server/hooks"), exports);
const server_1 = __importDefault(require("./server"));
server_1.default.init();
const service = server_1.default.api.service.create();
service.listen(async () => {
    urn_lib_1.urn_log.debug(`Listening on port ${server_1.default.conf.get(`service_port`)}...`);
    const auth_resp = await server_1.default.trx.hooks.superusers.authenticate('uranio@uranio.xyz', 'kcXkaF3Ad7KC3G3t');
    if (auth_resp.success) {
        server_1.default.trx.hooks.errors.count({}, auth_resp.payload.token);
    }
});
//# sourceMappingURL=dev.js.map