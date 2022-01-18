/**
 * Init module
 *
 * @packageDocumentation
 */

// import {urn_exception} from 'urn-lib';

// const urn_exc = urn_exception.init('INIT_TRX_MODULE', `TRX init module`);

import urn_trx from 'uranio-trx';

import {adm_config} from '../conf/defaults';

import * as types from '../types';

import * as conf from '../conf/';

// import * as book from '../book/';

export function init(config?:types.Configuration)
		:void{
	
	urn_trx.init(config);
	
	if(typeof config === 'undefined'){
		urn_trx.conf.set_from_env(adm_config);
	}else{
		urn_trx.conf.set(adm_config, config);
	}
	// _validate_adm_variables();
	// _validate_adm_book();
	
	conf.set_initialize(true);
}

/**
 * NOTE:
 * Maybe this should be before compilation and not at runtime?
 */
// function _validate_adm_book(){
// }

// function _validate_adm_variables(){
// }
