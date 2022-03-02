/**
 * Init module
 *
 * @packageDocumentation
 */

import {urn_log} from 'urn-lib';

import trx from 'uranio-trx';

import {adm_config} from '../conf/defaults';

import {register} from '../reg/server';

import {atom_book} from '../atoms';

import * as types from '../server/types';

import * as conf from '../conf/server';

import * as log from '../log/server';

export function init(config?:types.Configuration)
		:void{
	
	log.init(urn_log.defaults);
	
	/**
	 * Register required atoms must go before trx.init
	 * so that api.init can add the routes also to adm required
	 * atoms.
	 */
	_register_required_atoms();
	
	trx.init(config);
	
	if(typeof config === 'undefined'){
		trx.conf.set_from_env(adm_config);
	}else{
		trx.conf.set(adm_config, config);
	}
	
	conf.set_initialize(true);
}

function _register_required_atoms(){
	for(const [atom_name, atom_def] of Object.entries(atom_book)){
		register(atom_def as any, atom_name as any);
	}
}
