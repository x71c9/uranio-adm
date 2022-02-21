/**
 * Module for default client configuration object
 *
 * @packageDocumentation
 */

import trx from 'uranio-trx/client';

import {ClientConfiguration} from './types';

/**
 * IMPORTANT: if new variable are added here they must be added on
 * uranio-trx/conf/client.ts
 *
 * Unfortunately the browser doesn't allow to dynamically access process.env
 * properties, like process.env[var_name] where `var_name` is a variable.
 */
export const adm_client_config:Required<ClientConfiguration> = {
	
	...trx.conf.defaults
	
};
