/**
 * Conf module
 *
 * @packageDocumentation
 */

import {urn_util, urn_exception} from 'urn-lib';

const urn_exc = urn_exception.init('CONF_ADM_CLIENT_MODULE', `Admin client configuration module`);

import trx_client from 'uranio-trx/client';

import {adm_client_config} from '../client/defaults';

export {adm_client_config as defaults};

import * as types from '../client/types';

let _is_client_adm_initialized = false;

export function get<k extends keyof types.ClientConfiguration>(param_name:k)
		:typeof adm_client_config[k]{
	_check_if_uranio_was_initialized();
	_check_if_param_exists(param_name);
	return adm_client_config[param_name];
}

export function is_initialized():boolean{
	return trx_client.conf.is_initialized() && _is_client_adm_initialized;
}

export function set_initialize(is_initialized:boolean):void{
	_is_client_adm_initialized = is_initialized;
}

export function set(repo_config:Required<types.ClientConfiguration>, config:types.ClientConfiguration)
		:void{
	return trx_client.conf.set(repo_config, config);
}

function _check_if_param_exists(param_name:string){
	return urn_util.object.has_key(adm_client_config, param_name);
}

function _check_if_uranio_was_initialized(){
	if(is_initialized() === false){
		throw urn_exc.create_not_initialized(
			`NOT_INITIALIZED`,
			`Uranio was not initialized. Please run \`uranio.init()\` in your main file.`
		);
	}
}

