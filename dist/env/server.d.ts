/**
 * Env module
 *
 * @packageDocumentation
 */
import { Environment } from '../typ/env';
export declare function is_production(): boolean;
export declare function get<k extends keyof Environment>(param_name: k): Required<Environment>[k];
export declare function get_all(): Required<Environment>;
export declare function set(env: Partial<Environment>): void;
export declare function set_env(): void;
