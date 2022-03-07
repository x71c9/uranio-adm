"use strict";
/**
 * Module for default environment object
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adm_env = void 0;
const uranio_trx_1 = __importDefault(require("uranio-trx"));
exports.adm_env = {
    ...uranio_trx_1.default.env.defaults,
};
//# sourceMappingURL=defaults.js.map