/**
 * Panel module
 *
 * @packageDocumentation
 */
import { Builder } from 'nuxt';
export declare function build(dev?: boolean): Promise<typeof Builder>;
export declare function generate(): Promise<void>;
export declare function dev(): Promise<void>;
export declare function start(): Promise<void>;
