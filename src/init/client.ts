/**
 * Init module
 *
 * @packageDocumentation
 */

import urn_trx from 'uranio-trx/client';

// import {trx_client_config} from 'uranio-trx/cln/defaults';

import {adm_client_config} from '../cln/defaults';

import * as types from '../cln/types';

import * as conf from '../conf/client';

import {raw_config} from 'uranio-trx/raw/defaults';

export function init(config?:types.ClientConfiguration)
		:void{
	
	urn_trx.init(config);
	
	if(typeof config === 'undefined'){
		urn_trx.conf.set_from_env(adm_client_config);
	}else{
		urn_trx.conf.set(adm_client_config, config);
	}
	
	if(process.env.NETLIFY_DEV){
		
		raw_config.service_url = `http://localhost:7777/uranio/api`;
		
	}else if(process.env.NETLIFY){
		
		raw_config.service_url = `${process.env.URL}/uranio/api`;
		
	}
	
	_validate_adm_client_variables();
	_validate_adm_client_book();
	
	conf.set_initialize(true);
}

/**
 * NOTE:
 * Maybe this should be before compilation and not at runtime?
 */
function _validate_adm_client_book(){
	// example function
	// _validate_dock_url_uniqueness();
	// _validate_dock_route_url_uniqueness();
	// _validate_route_name();
}

/**
 * NOTE:
 * Maybe there is no need for this, it is already valid?
 * It depends if the client books have different properties of the server one.
 */
function _validate_adm_client_variables(){
	// example function
}

