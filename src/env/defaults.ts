/**
 * Module for default environment object
 *
 * @packageDocumentation
 */

import {Environment} from '../srv/types';

import trx from 'uranio-trx';

export const adm_env:Required<Environment> = {
	
	...trx.env.get_all(),
	
};
