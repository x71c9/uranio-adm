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
exports.adm_client_config = {
    ...client_1.default.conf.get_all(),
    default_atoms_setting: true,
    panel_protocol: 'http',
    panel_domain: '0.0.0.0',
    panel_port: 5454,
    dev_panel_protocol: 'http',
    dev_panel_domain: '0.0.0.0',
    dev_panel_port: 5454,
    panel_api_proxy: '',
    dev_panel_api_proxy: ''
    // service_protocol: 'http',
    // service_domain: '0.0.0.0',
    // service_port: 7777,
    // dev_service_protocol: 'http',
    // dev_service_domain: '0.0.0.0',
    // dev_service_port: 7777,
    // prefix_api: '/uranio/api',
    // dev_prefix_api: '/uranio/api',
};
//# sourceMappingURL=default_conf.js.map