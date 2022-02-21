/**
 * Module for default configuration object
 *
 * @packageDocumentation
 */

import {Configuration} from '../types';

import trx from 'uranio-trx';

export const adm_config:Required<Configuration> = {
	
	...trx.conf.defaults,
	
};
