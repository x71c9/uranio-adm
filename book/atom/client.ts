/**
 * Module for Client Book Methods
 *
 * @packageDocumentation
 */

import * as book_atom from 'uranio-trx/book/atom/client';

import {Book} from '../../typ/book_cln';

import {AtomName} from '../../types';

export * from 'uranio-trx/book/atom/client';

export function get_definition<A extends AtomName>(atom_name:A)
		:Book.BasicDefinition{
	return book_atom.get_definition(atom_name) as Book.BasicDefinition;
}
export function get_property_definition<A extends AtomName>(atom_name:A, property_name:keyof Book.Definition.Properties)
		:Book.Definition.Property{
	return book_atom.get_property_definition(atom_name, property_name);
}
export function get_custom_property_definitions<A extends AtomName>(atom_name:A)
		:Book.Definition.Properties{
	return book_atom.get_custom_property_definitions(atom_name);
}
export function get_all_property_definitions<A extends AtomName>(atom_name:A)
		:Book.Definition.Properties{
	return book_atom.get_all_property_definitions(atom_name);
}
