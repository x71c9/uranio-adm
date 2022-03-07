/**
 * Conf type module
 *
 * @packageDocumentation
 */
import trx from 'uranio-trx';
declare type RequiredConfigParams = {};
declare type OptionalConfigParam = {};
export declare type Configuration = trx.types.Configuration & RequiredConfigParams & Partial<OptionalConfigParam>;
export {};
