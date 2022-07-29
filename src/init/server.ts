/**
 * Init module
 *
 * @packageDocumentation
 */

import {urn_log} from 'urn-lib';

import trx from 'uranio-trx';

import {adm_config} from '../conf/defaults';

import * as register from '../reg/server';

import * as required from '../req/server';

import * as types from '../server/types';

import * as conf from '../conf/server';

import * as env from '../env/server';

import * as log from '../log/server';

export function init(
	config?: Partial<types.Configuration>,
	register_required=true
):void{
	
	trx.init(config, false);
	
	conf.set(trx.api.core.util.toml.read(adm_config));
	
	env.set_env();
	
	log.init(urn_log);
	
	if(config){
		conf.set(config);
	}
	
	if(register_required){
		_register_required_atoms();
	}
	
	_validate_adm_variables();
	_validate_adm_book();
	
	urn_log.debug(`Uranio adm initialization completed.`);
	
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
function _validate_adm_book(){
	// NOTHING TO DO YET
}

function _validate_adm_variables(){
	// NOTHING TO DO YET
}
