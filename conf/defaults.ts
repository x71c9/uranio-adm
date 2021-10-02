/**
 * Module for default configuration object
 *
 * @packageDocumentation
 */

import {FullConfiguration} from '../types';

import {api_config} from 'uranio-api/conf/defaults';

export const trx_config:FullConfiguration = {
	
	...api_config,
	
};
