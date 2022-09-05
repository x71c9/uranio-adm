/**
 * Client Conf module
 *
 * @packageDocumentation
 */

import {urn_context} from 'uranio-utils';

import urn_trx_client from 'uranio-trx/client';

import {adm_client_config} from '../cln/default_conf';

import {ClientConfiguration} from '../cln/types';

import * as env from '../env/client';

const urn_ctx = urn_context.create<Required<ClientConfiguration>>(
	adm_client_config,
	env.is_production(),
	'ADM:CONF:CLIENT'
);

set_service_url(_build_panel_proxied_service_url());

export function get<k extends keyof ClientConfiguration>(
	param_name:k
):Required<ClientConfiguration>[k]{
	return urn_ctx.get(param_name);
}

export function set(config:Partial<ClientConfiguration>):void{
	urn_ctx.set(config);
	set_service_url(_build_panel_proxied_service_url());
}

export function get_all():Required<ClientConfiguration>{
	return urn_ctx.get_all();
}

export function get_service_url():string{
	return urn_trx_client.conf.get_service_url();
}

export function set_service_url(url:string){
	return urn_trx_client.conf.set_service_url(url);
}

/**
 * This method differs from the server counterpart since all the calls in
 * the client must have the same Origin of the Panel in order for the
 * Authentication SameSite cookies to work.
 */
function _build_panel_proxied_service_url():string{
	const prefix = get(`prefix_api`);
	const panel_proxy = get(`panel_api_proxy`);
	if(typeof panel_proxy === 'string' && panel_proxy){
		return (panel_proxy + prefix)
			.replace(/([^:]\/)\/+/g, "$1"); // remove double slash
	}
	const panel_protocol = get(`panel_protocol`);
	const panel_domain = get(`panel_domain`);
	const panel_port = get(`panel_port`);
	return `${panel_protocol}://${panel_domain}:${panel_port}${prefix}`
		.replace(/([^:]\/)\/+/g, "$1"); // remove double slash
}

// export function get_service_url():string{
// 	const prefix = get(`prefix_api`);
// 	// If the configuraion cotains `panel_protocol`
// 	// it means the repo is uranio-adm, therefore the service url
// 	// is proxied by the panel
// 	if(typeof get(`panel_protocol` as any) === 'string'){
// 		const panel_protocol = get(`panel_protocol` as any);
// 		const panel_domain = get(`panel_domain` as any);
// 		const panel_port = get(`panel_port` as any);
// 		return `${panel_protocol}://${panel_domain}:${panel_port}${prefix}`;
// 	}
// 	const protocol = get(`service_protocol`);
// 	const domain = get(`service_domain`);
// 	const port = get(`service_port`);
// 	return `${protocol}://${domain}:${port}${prefix}`;
// }
