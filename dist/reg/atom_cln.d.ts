/**
 * Register module
 *
 * @packageDocumentation
 */
import * as types from '../client/types';
import { schema } from '../sch/client';
export declare function register<A extends schema.AtomName>(atom_definition: types.Book.Definition, atom_name?: A): string;
