/**
 * Module for default client configuration object
* Uranio generate script will replace this file with the client part
* of the uranio.toml configration file.
*
* All properties starting with `client_` will populate this object.
 *
 * @packageDocumentation
 */

import {ClientConfiguration} from './types';

export const client_toml:Partial<ClientConfiguration> = {
	service_url: "http://localhost:7774/uranio/api",
	dev_service_url: "http://localhost:5454/uranio/api",
	dev_panel_protocol: "http",
	dev_panel_domain: "localhost",
	dev_panel_port: 5454,
	dev_log_debug_info: false,
	dev_log_color: false,
	dev_log_time_format: "yyyy-mm-dd'T'HH:MM:ss:l",
	dev_log_max_str_length: 174,
	dev_log_prefix: "",
	dev_log_prefix_type: false,
	panel_protocol: "http",
	panel_domain: "localhost",
	panel_port: 5454,
	log_debug_info: false,
	log_color: false,
	log_time_format: "yyyy-mm-dd'T'HH:MM:ss:l",
	log_max_str_length: 174,
	log_prefix: "",
	log_prefix_type: false,
	prefix_log: "/logs",
	fetch: "axios",
};
