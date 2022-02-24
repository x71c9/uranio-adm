/**
 * Register module
 *
 * @packageDocumentation
 */

import trx from 'uranio-trx';

import * as types from '../server/types';

import {schema} from '../sch/server';

export function register<A extends schema.AtomName>(
	atom_definition:types.Book.Definition<A>,
	atom_name?:A
):string{
	const final_atom_name = trx.register(atom_definition, atom_name);
	return final_atom_name;
}
