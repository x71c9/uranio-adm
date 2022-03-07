/**
 * Env type module
 *
 * @packageDocumentation
 */
import trx from 'uranio-trx';
declare type RequiredEnvParams = {};
declare type OptionalEnvParam = {};
export declare type Environment = trx.types.Environment & RequiredEnvParams & Partial<OptionalEnvParam>;
export {};
