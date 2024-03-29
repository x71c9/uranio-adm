"use strict";
/**
 * ADM run module
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
server_1.default.init();
const service = server_1.default.api.service.create();
service.listen();
// a comment
//# sourceMappingURL=dev.js.map