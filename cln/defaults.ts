/**
 * Module for default client configuration object
 *
 * @packageDocumentation
 */

import {trx_client_config} from 'uranio-trx/cln/defaults';

import {FullClientConfiguration} from './types';

export const adm_client_config:FullClientConfiguration = {
	
	...trx_client_config
	
};
