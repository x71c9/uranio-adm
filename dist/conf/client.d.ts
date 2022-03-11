/**
 * Conf module
 *
 * @packageDocumentation
 */
import { ClientConfiguration } from '../client/types';
export declare function get<k extends keyof ClientConfiguration>(param_name: k): Required<ClientConfiguration>[k];
export declare function set(config: Partial<ClientConfiguration>): void;
export declare function get_all(): Required<ClientConfiguration>;
