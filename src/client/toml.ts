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
	service_url: "http://localhost:7777/uranio/api",
	service_dev_url: "http://localhost:7772/uranio/api",
	log_debug_info: false,
	log_color: false,
	log_time_format: "yyyy-mm-dd'T'HH:MM:ss:l",
	log_max_str_length: 174,
	log_prefix: "",
	log_prefix_type: false,
	log_dev_debug_info: false,
	log_dev_color: false,
	log_dev_time_format: "yyyy-mm-dd'T'HH:MM:ss:l",
	log_dev_max_str_length: 174,
	log_dev_prefix: "",
	log_dev_prefix_type: false,
};
