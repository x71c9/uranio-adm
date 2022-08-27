/**
 * Register module
 *
 * @packageDocumentation
 */

import trx_client from 'uranio-trx/client';

import * as types from '../cln/types';

export function atom(
	atom_definition: types.Book.Definition,
	atom_name?: string
):string{
	const final_atom_name = trx_client.register.atom(atom_definition, atom_name);
	return final_atom_name;
}
