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
    panel_protocol: "http",
    panel_domain: "localhost",
    panel_port: 4444,
    dev_panel_protocol: "http",
    dev_panel_domain: "localhost",
    dev_panel_port: 4444,
    dev_fetch_url: "http://localhost:4444/uranio/api",
    dev_log_debug_info: false,
    dev_log_color: true,
    dev_log_time_format: "yyyy-mm-dd'T'HH:MM:ss:l",
    dev_log_max_str_length: 174,
    dev_log_prefix: "",
    dev_log_prefix_type: false,
    fetch_url: "http://localhost:4444/uranio/api",
    log_debug_info: false,
    log_color: true,
    log_time_format: "HH:MM:ss:l",
    log_max_str_length: 174,
    log_prefix: "",
    log_prefix_type: false,
    prefix_log: "/logs",
    fetch: "axios",
    default_atoms_superuser: false,
    default_atoms_group: false,
    default_atoms_user: false,
    default_atoms_media: false,
    default_atoms_request: false,
    default_atoms_error: false,
    default_atoms_setting: false,
    service_url: "http://localhost:7774/uranio/api",
    dev_service_url: "http://localhost:7774/uranio/api",
};
//# sourceMappingURL=toml.js.map