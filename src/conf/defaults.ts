/**
 * Module for default configuration object
 *
 * @packageDocumentation
 */

import {Configuration} from '../types';

import {trx_config} from 'uranio-trx/conf/defaults';

export const adm_config:Required<Configuration> = {
	
	...trx_config,
	
};
