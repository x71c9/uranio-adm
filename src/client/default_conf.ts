/**
 * Module for default client configuration object
 *
 * @packageDocumentation
 */

import trx_client from 'uranio-trx/client';

import {ClientConfiguration} from './types';

export const adm_client_config:Required<ClientConfiguration> = {
	
	...trx_client.conf.get_all(),
	
	default_atoms_setting: true,
	
	panel_protocol: 'http',
	
	panel_domain: '0.0.0.0',
	
	panel_port: 5454,
	
	dev_panel_protocol: 'http',
	
	dev_panel_domain: '0.0.0.0',
	
	dev_panel_port: 5454,
	
	api_proxy: '',
	
	dev_api_proxy: ''
	
	// service_protocol: 'http',
	
	// service_domain: '0.0.0.0',
	
	// service_port: 7777,
	
	// dev_service_protocol: 'http',
	
	// dev_service_domain: '0.0.0.0',
	
	// dev_service_port: 7777,
	
	// prefix_api: '/uranio/api',
	
	// dev_prefix_api: '/uranio/api',
	
};
