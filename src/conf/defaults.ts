/**
 * Module for default configuration object
 *
 * @packageDocumentation
 */

import {Configuration} from '../server/types';

import trx from 'uranio-trx';

export const adm_config:Required<Configuration> = {
	
	...trx.conf.defaults,
	
};