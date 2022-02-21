/**
 * Conf type module
 *
 * @packageDocumentation
 */
import { Configuration as TrxConfiguration } from 'uranio-trx/types';
declare type RequiredConfigParams = {};
declare type OptionalConfigParam = {};
export declare type Configuration = TrxConfiguration & RequiredConfigParams & Partial<OptionalConfigParam>;
export {};
