/**
 * Register module
 *
 * @packageDocumentation
 */
import * as types from '../cln/types';
import { schema } from '../sch/index';
export declare function register<A extends schema.AtomName>(atom_definition: types.Book.Definition, atom_name?: A): string;
