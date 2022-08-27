/**
 * Client Conf module
 *
 * @packageDocumentation
 */
import { ClientConfiguration } from '../cln/types';
export declare function get<k extends keyof ClientConfiguration>(param_name: k): Required<ClientConfiguration>[k];
export declare function set(config: Partial<ClientConfiguration>): void;
export declare function get_all(): Required<ClientConfiguration>;
export declare function get_service_url(): string;
export declare function set_service_url(url: string): void;
