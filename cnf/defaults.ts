/**
 * Module for default configuration object
 *
 * @packageDocumentation
 */

import {FullConfiguration} from '../types';

import {trx_config} from 'uranio-trx/cnf/defaults';

export const adm_config:FullConfiguration = {
	
	...trx_config,
	
};
