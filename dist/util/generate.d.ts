/**
 * Generate module
 *
 * @packageDocumentation
 */
import { ClientConfiguration } from '../typ/conf_cln';
export declare const process_params: {
    urn_command: string;
};
export declare function schema(): string;
export declare function schema_and_save(): void;
export declare function save_schema(text: string): void;
export declare function hooks_server(): string;
export declare function hooks_client(): string;
export declare function hooks_and_save(): void;
export declare function save_hooks_server(text: string): void;
export declare function save_hooks_client(text: string): void;
export declare function hook_types(): string;
export declare function hook_types_and_save(): void;
export declare function save_hook_types(text: string): void;
export declare function client_config(client_default: Required<ClientConfiguration>): string;
export declare function client_config_and_save(client_default: Required<ClientConfiguration>): void;
export declare function save_client_config(text: string): void;
export declare function init(): void;
