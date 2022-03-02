#!/usr/bin/env node
"use strict";
/**
 * Admin binary entrypoint for uranio-api command
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const result = dotenv_1.default.config();
if (result.error) {
    throw result.error;
}
const urn_lib_1 = require("urn-lib");
urn_lib_1.urn_log.init({
    log_level: urn_lib_1.urn_log.LogLevel.FUNCTION_DEBUG,
    debug_info: false,
    color: true
});
const server_1 = __importDefault(require("./server"));
server_1.default.init();
const service = server_1.default.api.service.create();
service.listen(() => {
    urn_lib_1.urn_log.debug(`Uranio service listening on port ${server_1.default.conf.get(`service_port`)}...`);
});
//# sourceMappingURL=api.js.map