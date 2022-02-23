/**
 * Register module
 *
 * @packageDocumentation
 */

import trx_client from 'uranio-trx/client';

import * as types from '../cln/types';

import {schema} from '../sch/client';

export function register<A extends schema.AtomName>(
	atom_definition:types.Book.Definition,
	atom_name?:A
):string{
	const final_atom_name = trx_client.register(atom_definition, atom_name);
	return final_atom_name;
}
