/**
 * Env module
 *
 * @packageDocumentation
 */

import {urn_util, urn_exception} from 'urn-lib';

const urn_exc = urn_exception.init('ADM_ENV_MODULE', `Admin environment module`);

import trx from 'uranio-trx';

import {adm_env} from './defaults';

export {adm_env as defaults};

import * as types from '../server/types';

let _is_adm_initialized = false;

export function get<k extends keyof types.Environment>(param_name:k)
		:typeof adm_env[k]{
	_check_if_uranio_was_initialized();
	_check_if_param_exists(param_name);
	return adm_env[param_name];
}

export function get_current<k extends keyof types.Environment>(param_name:k)
		:typeof adm_env[k]{
	return trx.env.get_current(param_name);
}

export function is_initialized():boolean{
	return trx.env.is_initialized() && _is_adm_initialized;
}

export function set_initialize(is_initialized:boolean):void{
	_is_adm_initialized = is_initialized;
}

export function set_from_env(repo_env:Required<types.Environment>)
		:void{
	return trx.env.set_from_env(repo_env);
}

export function set(
	repo_env: Required<types.Environment>,
	config: Partial<types.Environment>
):void{
	return trx.env.set(repo_env, config);
}

export function is_production():boolean{
	return trx.env.is_production();
}

function _check_if_param_exists(param_name:string){
	return urn_util.object.has_key(adm_env, param_name);
}

function _check_if_uranio_was_initialized(){
	if(is_initialized() === false){
		throw urn_exc.create_not_initialized(
			`NOT_INITIALIZED`,
			`Uranio admin was not initialized. Please run \`uranio.init()\` in your main file.`
		);
	}
}
