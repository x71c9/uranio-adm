/**
 * Generate module
 *
 * @packageDocumentation
 */
export declare const process_params: {
    urn_command: string;
    urn_hook_types_path: string;
    urn_output_dir: string;
    urn_repo: string;
};
export declare function schema(): string;
export declare function schema_and_save(): void;
export declare function save_schema(text: string): void;
export declare function hooks(repo: string): string;
export declare function hooks_and_save(repo: string): void;
export declare function save_hooks(text: string): void;
export declare function hook_types(): string;
export declare function hook_types_and_save(): void;
export declare function save_hook_types(text: string): void;
export declare function init(): void;
