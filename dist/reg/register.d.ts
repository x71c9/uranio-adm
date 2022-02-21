/**
 * Register module
 *
 * @packageDocumentation
 */
import * as types from '../types';
import { schema } from '../sch/index';
export declare function register<A extends schema.AtomName>(atom_definition: types.Book.Definition<A>, atom_name?: A): string;
