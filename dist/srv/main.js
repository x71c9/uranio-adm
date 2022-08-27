"use strict";
/**
 * Main module for server
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = exports.required = exports.register = exports.util = exports.env = exports.conf = exports.book = exports.log = exports.schema = exports.trx = exports.api = exports.core = void 0;
const uranio_core_1 = __importDefault(require("uranio-core"));
exports.core = uranio_core_1.default;
const uranio_api_1 = __importDefault(require("uranio-api"));
exports.api = uranio_api_1.default;
const uranio_trx_1 = __importDefault(require("uranio-trx"));
exports.trx = uranio_trx_1.default;
const server_1 = require("../sch/server");
Object.defineProperty(exports, "schema", { enumerable: true, get: function () { return server_1.schema; } });
const book = __importStar(require("../book/server"));
exports.book = book;
const conf = __importStar(require("../conf/server"));
exports.conf = conf;
const env = __importStar(require("../env/server"));
exports.env = env;
const log = __importStar(require("../log/server"));
exports.log = log;
const util = __importStar(require("../util/server"));
exports.util = util;
const register = __importStar(require("../reg/server"));
exports.register = register;
const required = __importStar(require("../req/server"));
exports.required = required;
const types = __importStar(require("./types"));
exports.types = types;
__exportStar(require("../init/server"), exports);
//# sourceMappingURL=main.js.map