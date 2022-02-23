/**
 * Module for Server Atom Book Methods
 *
 * @packageDocumentation
 */

import trx from 'uranio-trx';

import {Book} from '../typ/book_srv';

import {schema} from '../sch/server';

import * as book_client from './client';

export function get_route_def<A extends schema.AtomName, R extends schema.RouteName<A>>(
	atom_name: A,
	route_name: R
):Book.Definition.Dock.Routes.Route<A,R>{
	return trx.book.get_route_def(atom_name, route_name);
}

export function get_routes_definition<A extends schema.AtomName>(atom_name:A)
		:Book.Definition.Dock.Routes<A>{
	return trx.book.get_routes_definition(atom_name);
}

export function get_routes_definition_with_defaults<A extends schema.AtomName>(atom_name:A)
		:Book.Definition.Dock.Routes<A>{
	return trx.book.get_routes_definition_with_defaults(atom_name);
}

export function get_dock_definition<A extends schema.AtomName>(atom_name:A)
		:Book.Definition.Dock<A>{
	return book_client.get_dock_definition(atom_name) as Book.Definition.Dock<A>;
}

export function add_definition<A extends schema.AtomName>(atom_name:A, atom_definition:Book.Definition<A>)
		:Book{
	return trx.book.add_definition(atom_name, atom_definition);
}

export function get_names():schema.AtomName[]{
	return trx.book.get_names();
}

export function validate_name(atom_name:string):boolean{
	return trx.book.validate_name(atom_name);
}

export function get_plural(atom_name:schema.AtomName):string{
	return trx.book.get_plural(atom_name);
}

export function get_all_definitions():Book{
	return trx.book.get_all_definitions();
}

export function get_definition<A extends schema.AtomName>(atom_name:A)
		:Book.Definition<A>{
	return trx.book.get_definition(atom_name);
}

export function get_property_definition<A extends schema.AtomName>(
	atom_name:A,
	property_name:keyof Book.Definition.Properties
):Book.Definition.Property{
	return trx.book.get_property_definition(atom_name, property_name);
}

export function get_custom_property_definitions<A extends schema.AtomName>(atom_name:A)
		:Book.Definition.Properties{
	return trx.book.get_custom_property_definitions(atom_name);
}

export function get_full_properties_definition<A extends schema.AtomName>(atom_name:A)
		:Book.Definition.Properties{
	return trx.book.get_full_properties_definition(atom_name);
}

export function has_property<A extends schema.AtomName>(atom_name:A, key:string)
		:boolean{
	return trx.book.has_property(atom_name, key);
}

