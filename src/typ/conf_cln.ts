/**
 * Client Conf type module
 *
 * @packageDocumentation
 */

import trx_client from 'uranio-trx/client';

type RequiredClientConfigParams = {
}

type OptionalClientConfigParam = {
	default_atoms_setting: boolean
	panel_protocol: string
	panel_domain: string
	panel_port: number
	dev_panel_protocol: string
	dev_panel_domain: string
	dev_panel_port: number
	panel_proxy: string
	dev_panel_proxy: string
	// service_protocol: string
	// dev_service_protocol: string
	// service_domain: string
	// dev_service_domain: string
	// service_port: number
	// dev_service_port: number
	// prefix_api:string
	// dev_prefix_api:string
}

export type ClientConfiguration =
	trx_client.types.ClientConfiguration &
	RequiredClientConfigParams &
	Partial<OptionalClientConfigParam>;
