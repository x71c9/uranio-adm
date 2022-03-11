"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("uranio/client"));
client_1.default.init();
console.log(client_1.default.conf.get_all());
const vue_1 = __importDefault(require("vue"));
vue_1.default.prototype.$uranio = client_1.default;
//# sourceMappingURL=uranio.js.map