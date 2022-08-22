/**
 * Client Conf type module
 *
 * @packageDocumentation
 */
import trx_client from 'uranio-trx/client';
declare type RequiredClientConfigParams = {};
declare type OptionalClientConfigParam = {
    default_atoms_setting: boolean;
    panel_protocol: string;
    panel_domain: string;
    panel_port: number;
    dev_panel_protocol: string;
    dev_panel_domain: string;
    dev_panel_port: number;
    panel_api_proxy: string;
    dev_panel_api_proxy: string;
};
export declare type ClientConfiguration = trx_client.types.ClientConfiguration & RequiredClientConfigParams & Partial<OptionalClientConfigParam>;
export {};
