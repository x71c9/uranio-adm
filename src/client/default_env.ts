/**
 * Module for default client configuration object
 *
 * @packageDocumentation
 */

import trx_client from 'uranio-trx/client';

import {ClientEnvironment} from './types';

/**
 * IMPORTANT: if new variable are added here they must be added on
 * uranio-trx_client/env/client.ts
 *
 * Unfortunately the browser doesn't allow to dynamically access process.env
 * properties, like process.env[var_name] where `var_name` is a variable.
 */
export const adm_client_env:Required<ClientEnvironment> = {
	
	...trx_client.env.get_all()
	
};
