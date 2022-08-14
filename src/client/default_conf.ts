/**
 * Module for default client configuration object
 *
 * @packageDocumentation
 */

import trx_client from 'uranio-trx/client';

import {ClientConfiguration} from './types';

/**
 * IMPORTANT: if new variables are added here they must be added on
 * uranio-adm_client/conf/client.ts
 *
 * Unfortunately the browser doesn't allow to dynamically access process.env
 * properties, like process.env[var_name] where `var_name` is a variable.
 */
export const adm_client_config:Required<ClientConfiguration> = {
	
	...trx_client.conf.get_all(),
	
	default_atoms_setting: true,
	
	panel_protocol: 'http',
	
	panel_domain: 'localhost',
	
	panel_port: 5454,
	
	dev_panel_protocol: 'http',
	
	dev_panel_domain: 'localhost',
	
	dev_panel_port: 5454,
	
	service_protocol: 'http',
	
	service_domain: '0.0.0.0',
	
	service_port: 7777,
	
	dev_service_protocol: 'http',
	
	dev_service_domain: '0.0.0.0',
	
	dev_service_port: 7777,
	
	prefix_api: '/uranio/api',
	
	dev_prefix_api: '/uranio/api',
	
};
