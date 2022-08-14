"use strict";
/**
 * Module for default client configuration object
 * Uranio `generate` script will replace this file with the client part
 * of the uranio.toml configration file.
 *
 * All properties starting with `client_` will populate this object.
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.client_toml = void 0;
exports.client_toml = {
    panel_protocol: "https",
    panel_domain: "localhost",
    panel_port: 4444,
    dev_panel_protocol: "https",
    dev_panel_domain: "localhost",
    dev_panel_port: 4444,
    // dev_fetch_url: "https://localhost:4444/uranio/api",
    dev_log_debug_info: false,
    dev_log_color: true,
    dev_log_time_format: "yyyy-mm-dd'T'HH:MM:ss:l",
    dev_log_max_str_length: 174,
    dev_log_prefix: "",
    dev_log_prefix_type: false,
    // fetch_url: "https://localhost:4444/uranio/api",
    log_debug_info: false,
    log_color: true,
    log_time_format: "HH:MM:ss:l",
    log_max_str_length: 174,
    log_prefix: "",
    log_prefix_type: false,
    prefix_api: "/uranio/api",
    prefix_log: "/logs",
    fetch: "axios",
    service_protocol: 'http',
    service_domain: 'localhost',
    service_port: 7777,
    dev_service_protocol: 'http',
    dev_service_domain: 'localhost',
    dev_service_port: 7777,
    default_atoms_superuser: true,
    default_atoms_group: true,
    default_atoms_user: true,
    default_atoms_media: true,
    default_atoms_request: true,
    default_atoms_error: true,
    default_atoms_setting: true,
    service_url: "https://localhost:7774/uranio/api",
    dev_service_url: "https://localhost:7774/uranio/api",
};
//# sourceMappingURL=toml.js.map