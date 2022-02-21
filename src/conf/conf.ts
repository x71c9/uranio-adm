/**
 * Conf module
 *
 * @packageDocumentation
 */

import {urn_util, urn_exception} from 'urn-lib';

const urn_exc = urn_exception.init('CONF_ADM_MODULE', `Admin configuration module`);

import urn_trx from 'uranio-trx';

import {adm_config} from './defaults';

import * as types from '../types';

let _is_adm_initialized = false;

export function get<k extends keyof types.FullConfiguration>(param_name:k)
		:typeof adm_config[k]{
	_check_if_uranio_was_initialized();
	_check_if_param_exists(param_name);
	return adm_config[param_name];
}

export function is_initialized():boolean{
	return urn_trx.conf.is_initialized() && _is_adm_initialized;
}

export function set_initialize(is_initialized:boolean):void{
	_is_adm_initialized = is_initialized;
}

export function set_from_env(repo_config:types.FullConfiguration)
		:void{
	return urn_trx.conf.set_from_env(repo_config);
}

export function set(repo_config:types.FullConfiguration, config:types.Configuration)
		:void{
	return urn_trx.conf.set(repo_config, config);
}

function _check_if_param_exists(param_name:string){
	return urn_util.object.has_key(adm_config, param_name);
}

function _check_if_uranio_was_initialized(){
	if(is_initialized() === false){
		throw urn_exc.create_not_initialized(
			`NOT_INITIALIZED`,
			`Uranio admin was not initialized. Please run \`uranio.init()\` in your main file.`
		);
	}
}
