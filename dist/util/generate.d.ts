/**
 * Generate module
 *
 * @packageDocumentation
 */
export declare const process_params: {
    urn_command: string;
    urn_base_schema: string;
    urn_base_types: string;
    urn_output_dir: string;
    urn_repo: string;
};
export declare function schema(): string;
export declare function schema_and_save(): void;
export declare function save_schema(text: string): void;
export declare function hooks(): string;
export declare function hooks_and_save(): void;
export declare function save_hooks(text: string): void;
export declare function trx_types(): string;
export declare function trx_types_and_save(): void;
export declare function save_trx_types(text: string): void;
export declare function init(): void;
