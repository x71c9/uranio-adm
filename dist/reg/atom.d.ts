/**
 * Register module
 *
 * @packageDocumentation
 */
/**
 * See core server register atom
 */
import * as types from '../client/types';
import { schema } from '../sch/server';
export declare function register<A extends schema.AtomName>(atom_definition: types.Book.Definition, atom_name?: A): string;
