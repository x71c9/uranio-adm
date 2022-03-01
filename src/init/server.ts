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

import * as book from '../book/server';

export function init(config?:types.Configuration)
		:void{
	
	log.init(urn_log.defaults);
	
	trx.init(config);
	
	_add_default_routes();
	_register_required_atoms();
	
	if(typeof config === 'undefined'){
		trx.conf.set_from_env(adm_config);
	}else{
		trx.conf.set(adm_config, config);
	}
	
	conf.set_initialize(true);
}

function _add_default_routes(){
	const core_atom_book = book.get_all_definitions();
	for(const [atom_name, atom_def] of Object.entries(core_atom_book)){
		(atom_def.dock as any).routes = trx.api.routes.return_default_routes(atom_name as schema.AtomName);
	}
}
function _register_required_atoms(){
	for(const [atom_name, atom_def] of Object.entries(atom_book)){
		register(atom_def as any, atom_name as any);
	}
}
