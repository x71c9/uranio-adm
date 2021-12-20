/**
 * Init module
 *
 * @packageDocumentation
 */

import urn_trx from 'uranio-trx/client';

import {adm_client_config} from '../cln/defaults';

import * as types from '../cln/types';

import * as conf from '../conf/client';

export function init(config:types.ClientConfiguration)
		:void{
	
	urn_trx.init(config);
	
	conf.set(adm_client_config, config);
	
	conf.set_initialize(true);
}
