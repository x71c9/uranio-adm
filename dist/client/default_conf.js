"use strict";
/**
 * Module for default client configuration object
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adm_client_config = void 0;
const client_1 = __importDefault(require("uranio-trx/client"));
/**
 * IMPORTANT: if new variables are added here they must be added on
 * uranio-adm_client/conf/client.ts
 *
 * Unfortunately the browser doesn't allow to dynamically access process.env
 * properties, like process.env[var_name] where `var_name` is a variable.
 */
exports.adm_client_config = {
    ...client_1.default.conf.get_all(),
    default_atoms_setting: true,
    panel_protocol: 'http',
    panel_domain: 'localhost',
    panel_port: 5454,
    dev_panel_protocol: 'http',
    dev_panel_domain: 'localhost',
    dev_panel_port: 5454,
};
//# sourceMappingURL=default_conf.js.map