/**
 * Client Conf type module
 *
 * @packageDocumentation
 */
import { ClientConfiguration as TrxClientConfiguration } from 'uranio-trx/client/types';
declare type RequiredClientConfigParams = {};
declare type OptionalClientConfigParam = {};
export declare type ClientConfiguration = TrxClientConfiguration & RequiredClientConfigParams & Partial<OptionalClientConfigParam>;
export {};