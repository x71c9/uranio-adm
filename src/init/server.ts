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

import * as log from '../log/server';

export function init(
	config?: Partial<types.Configuration>,
	register_required=true
):void{
	
	log.init(urn_log.defaults);
	
	trx.init(config, false);
	
	conf.set_from_env(adm_config);
	if(config){
		conf.set(adm_config, config);
	}
	
	if(register_required){
		_register_required_atoms();
	}
	
	conf.set_initialize(true);
	
	urn_log.defaults.log_level = conf.get(`log_level`);
	
}

function _register_required_atoms(){
	const required_atoms = required.get();
	for(const [atom_name, atom_def] of Object.entries(required_atoms)){
		register.atom(atom_def as any, atom_name);
	}
}
