/**
 * Env module
 *
 * @packageDocumentation
 */

import {urn_context} from 'urn-lib';

import trx_client from 'uranio-trx/client';

import {adm_client_env} from '../client/default_env';

import {ClientEnvironment} from '../typ/env_cln';

const urn_ctx = urn_context.create<Required<ClientEnvironment>>(
	adm_client_env,
	is_production(),
	'ADM:ENV:CLIENT'
);

export function is_production():boolean{
	return trx_client.env.is_production();
}

export function get<k extends keyof ClientEnvironment>(
	param_name:k
):Required<ClientEnvironment>[k]{
	return urn_ctx.get(param_name);
}

export function get_all():Required<ClientEnvironment>{
	return urn_ctx.get_all();
}

export function set(env:Partial<ClientEnvironment>):void{
	urn_ctx.set(env);
}

export function set_env():void{
	urn_ctx.set_env();
}
