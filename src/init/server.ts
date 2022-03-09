/**
 * Init module
 *
 * @packageDocumentation
 */

import {urn_log} from 'urn-lib';

import trx from 'uranio-trx';

import {adm_config} from '../conf/defaults';

import {adm_env} from '../env/defaults';

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
	
	env.set_from_env(adm_env);
	
	trx.api.core.conf.set_from_file(adm_config);
	
	if(config){
		conf.set(adm_config, config);
	}
	
	if(register_required){
		_register_required_atoms();
	}
	
	conf.set_initialize(true);
	env.set_initialize(true);
	
	log.init(urn_log);
	
	urn_log.debug(`Uranio adm initialization completed.`);
	
}

function _register_required_atoms(){
	const required_atoms = required.get();
	for(const [atom_name, atom_def] of Object.entries(required_atoms)){
		register.atom(atom_def as any, atom_name);
	}
}
