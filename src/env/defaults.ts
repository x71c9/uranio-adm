/**
 * Module for default environment object
 *
 * @packageDocumentation
 */

import {Environment} from '../server/types';

import trx from 'uranio-trx';

export const adm_env:Required<Environment> = {
	
	...trx.env.defaults,
	
};
