"use strict";
/**
 * Register module
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const client_1 = __importDefault(require("uranio-trx/client"));
function route(route, atom_name, route_name) {
    return client_1.default.register.route(route, atom_name, route_name);
}
exports.route = route;
//# sourceMappingURL=route_cln.js.map