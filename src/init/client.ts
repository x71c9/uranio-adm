/**
 * Init module
 *
 * @packageDocumentation
 */

import {urn_log} from 'urn-lib';

import trx_client from 'uranio-trx/client';

import {adm_client_config} from '../client/defaults';

import * as register from '../reg/client';

import * as required from '../req/client';

import * as types from '../client/types';

import * as conf from '../conf/client';

import * as log from '../log/client';

export function init(config?:types.ClientConfiguration, register_required=true)
		:void{
	
	log.init(urn_log.defaults);
	
	trx_client.init(config, false);
	
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
	
	if(register_required){
		_register_required_atoms();
	}
	
	_validate_adm_client_variables();
	_validate_adm_client_book();
	
	conf.set_initialize(true);
	
	urn_log.defaults.log_level = conf.get(`log_level`);
	
}

function _register_required_atoms(){
	const required_atoms = required.get();
	for(const [atom_name, atom_def] of Object.entries(required_atoms)){
		register.atom(atom_def as any, atom_name);
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

