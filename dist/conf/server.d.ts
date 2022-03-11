/**
 * Conf module
 *
 * @packageDocumentation
 */
import { Configuration } from '../typ/conf';
export declare function get<k extends keyof Configuration>(param_name: k): Required<Configuration>[k];
export declare function set(config: Partial<Configuration>): void;
export declare function get_all(): Required<Configuration>;
