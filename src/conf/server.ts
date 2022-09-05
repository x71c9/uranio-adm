/**
 * Server Conf module
 *
 * @packageDocumentation
 */

import {urn_context} from 'uranio-utils';

import urn_trx from 'uranio-trx';

import {adm_config} from './defaults';

import {Configuration} from '../typ/conf';

import * as env from '../env/server';

const urn_ctx = urn_context.create<Required<Configuration>>(
	adm_config,
	env.is_production(),
	'ADM:CONF'
);

export function get<k extends keyof Configuration>(
	param_name:k
):Required<Configuration>[k]{
	return urn_ctx.get(param_name);
}

export function set(config:Partial<Configuration>):void{
	urn_ctx.set(config);
	set_service_url(_build_service_url());
}

export function get_all():Required<Configuration>{
	return urn_ctx.get_all();
}

export function get_service_url():string{
	return urn_trx.conf.get_service_url();
}

export function set_service_url(url:string){
	return urn_trx.conf.set_service_url(url);
}

/**
 * This method differs from the client counterpart since there is no need
 * to proxy the hooks to the Panel URL.
 */
function _build_service_url():string{
	const service_proxy = get(`service_proxy`);
	const prefix = get(`prefix_api`);
	if(typeof service_proxy === 'string' && service_proxy){
		return (service_proxy + prefix)
			.replace(/([^:]\/)\/+/g, "$1"); // remove double slash
	}
	const service_protocol = get(`service_protocol`);
	const service_domain = get(`service_domain`);
	const service_port = get(`service_port`);
	return `${service_protocol}://${service_domain}:${service_port}${prefix}`
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
