/**
 * Conf module
 *
 * @packageDocumentation
 */
import { adm_config } from './defaults';
export { adm_config as defaults };
import * as types from '../server/types';
export declare function get<k extends keyof types.Configuration>(param_name: k): typeof adm_config[k];
export declare function is_initialized(): boolean;
export declare function set_initialize(is_initialized: boolean): void;
export declare function set_from_env(repo_config: Required<types.Configuration>): void;
export declare function set(repo_config: Required<types.Configuration>, config: Partial<types.Configuration>): void;
