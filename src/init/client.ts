/**
 * Init module
 *
 * @packageDocumentation
 */

import {urn_log} from 'urn-lib';

import trx_client from 'uranio-trx/client';

import {adm_client_config} from '../client/defaults';

import {register} from '../reg/client';

import {atom_book} from '../atoms';

import * as types from '../client/types';

import * as conf from '../conf/client';

import * as log from '../log/client';

export function init(config?:types.ClientConfiguration)
		:void{
	
	log.init(urn_log.defaults);
	
	/**
	 * Register required atoms must go before trx.init
	 * so that api.init can add the routes also to adm required
	 * atoms.
	 */
	_register_required_atoms();
	
	trx_client.init(config);
	
	if(typeof config === 'undefined'){
		trx_client.conf.set_from_env(adm_client_config);
	}else{
		trx_client.conf.set(adm_client_config, config);
	}
	
	if(process.env.NETLIFY_DEV){
		
		trx_client.conf.defaults.service_url = `http://localhost:7777/uranio/api`;
		
	}else if(process.env.NETLIFY){
		
		trx_client.conf.defaults.service_url = `${process.env.URL}/uranio/api`;
		
	}
	
	_validate_adm_client_variables();
	_validate_adm_client_book();
	
	conf.set_initialize(true);
}

function _register_required_atoms(){
	for(const [atom_name, atom_def] of Object.entries(atom_book)){
		register(atom_def as any, atom_name as any);
	}
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

