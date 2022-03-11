/**
 * Env module
 *
 * @packageDocumentation
 */
import { ClientEnvironment } from '../typ/env_cln';
export declare function is_production(): boolean;
export declare function get<k extends keyof ClientEnvironment>(param_name: k): Required<ClientEnvironment>[k];
export declare function get_all(): Required<ClientEnvironment>;
export declare function set(env: Partial<ClientEnvironment>): void;
export declare function set_env(): void;
