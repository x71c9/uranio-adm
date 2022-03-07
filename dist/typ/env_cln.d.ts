/**
 * Client Conf type module
 *
 * @packageDocumentation
 */
import trx_client from 'uranio-trx/client';
declare type RequiredClientEnvParams = {};
declare type OptionalClientEnvParam = {};
export declare type ClientEnvironment = trx_client.types.ClientEnvironment & RequiredClientEnvParams & Partial<OptionalClientEnvParam>;
export {};
