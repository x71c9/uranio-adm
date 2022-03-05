/**
 * Generate module
 *
 * @packageDocumentation
 */
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
export declare function init(): void;
