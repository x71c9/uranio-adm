/**
 * Init module
 *
 * @packageDocumentation
 */

import {urn_log} from 'urn-lib';

import trx from 'uranio-trx';

import {adm_config} from '../conf/defaults';

import * as types from '../types';

import * as conf from '../conf/index';

import * as log from '../log/index';

export function init(config?:types.Configuration)
		:void{
	
	// Raw create use `service_url` from client_config.
	// client_init.init();
	
	log.init(urn_log.defaults);
	
	trx.init(config);
	
	if(typeof config === 'undefined'){
		trx.conf.set_from_env(adm_config);
	}else{
		trx.conf.set(adm_config, config);
	}
	
	// _validate_adm_variables();
	// _validate_adm_book();
	
	// adm_config.service_url = '';
	// adm_config.service_url += `${adm_config.service_protocol}://`;
	// adm_config.service_url += `${adm_config.service_domain}:`;
	// adm_config.service_url += `${adm_config.service_port}/uranio/api`;
	
	/**
	 * trx_config must be updated too.
	 */
	// trx_config.service_url = adm_config.service_url;
	
	// adm_client_config.service_url = adm_config.service_url;
	
	// trx_client_config.service_url = trx_config.service_url;
	
	// console.log('ADM: ', adm_config);
	// console.log('TRX: ', trx_config);
	
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
