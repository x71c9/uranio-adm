/**
 * Admin init module
 *
 * @packageDocumentation
 */

import {urn_log} from 'uranio-utils';

import trx_client from 'uranio-trx/client';

import * as register from '../reg/client';

import * as required from '../req/client';

import * as types from '../cln/types';

import * as conf from '../conf/client';

import * as env from '../env/client';

import * as log from '../log/client';

import {client_toml} from '../cln/toml';

export function init(
	config?:Partial<types.ClientConfiguration>,
	register_required=true
):void{
	
	trx_client.init(config, false);
	
	trx_client.conf.set(client_toml);
	trx_client.api.conf.set(client_toml);
	trx_client.core.conf.set(client_toml);
	/*
	 * The following method must be the last so that service URL can be overwritten
	 * with the proxied panel URL.
	 */
	conf.set(client_toml);
	
	env.set_client_env();
	
	if(config){
		conf.set(config);
	}
	
	if(register_required){
		_register_required_atoms();
	}
	
	_validate_adm_client_variables();
	_validate_adm_client_book();
	
	log.init(urn_log);
	
	urn_log.trace(`Uranio adm client initialization completed.`);
	
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

