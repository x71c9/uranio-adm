/**
 * Module for Client Book Methods
 *
 * @packageDocumentation
 */

import trx_client from 'uranio-trx/client';

import {Book} from '../typ/book_cln';

import {schema} from '../sch/client';

export function get_route_definition<A extends schema.AtomName, R extends schema.RouteName<A>>(
	atom_name: A,
	route_name: R
):Book.Definition.Dock.Routes.Route{
	return trx_client.book.get_route_definition(atom_name, route_name);
}

export function get_routes_definition<A extends schema.AtomName>(
	atom_name:A
):Book.Definition.Dock.Routes{
	return trx_client.book.get_routes_definition(atom_name);
}

export function get_routes_defintion(atom_name:schema.AtomName)
		:Book.Definition.Dock.Routes{
	return trx_client.book.get_routes_defintion(atom_name);
}

export function get_dock_definition<A extends schema.AtomName>(atom_name:A)
		:Book.Definition.Dock{
	return trx_client.book.get_dock_definition(atom_name);
}

export function add_route_definition<A extends schema.AtomName>(
	atom_name:A,
	route_name: schema.RouteName<A>,
	route_definition:Book.Definition.Dock.Routes.Route
):Book.Definition.Dock.Routes{
	return trx_client.book.add_route_definition(atom_name, route_name, route_definition);
}

export function add_definition<A extends schema.AtomName>(
	atom_name:A,
	atom_definition:Book.Definition
):Book{
	return trx_client.book.add_definition(atom_name, atom_definition);
}

export function get_plural(atom_name:schema.AtomName):string{
	return trx_client.book.get_plural(atom_name);
}

export function validate_name(atom_name:string):atom_name is schema.AtomName{
	return trx_client.book.validate_name(atom_name);
}

export function validate_auth_name(auth_name:string):auth_name is schema.AuthName{
	return trx_client.book.validate_auth_name(auth_name);
}

export function get_all_definitions():Book{
	return trx_client.book.get_all_definitions();
}

export function get_definition<A extends schema.AtomName>(atom_name:A)
		:Book.Definition{
	return trx_client.book.get_definition(atom_name);
}

export function get_property_definition<A extends schema.AtomName>(
	atom_name:A,
	property_name:keyof Book.Definition.Properties
):Book.Definition.Property{
	return trx_client.book.get_property_definition(atom_name, property_name);
}

export function get_custom_properties_definition<A extends schema.AtomName>(
	atom_name:A
):Book.Definition.Properties{
	return trx_client.book.get_custom_properties_definition(atom_name);
}

export function get_properties_definition<A extends schema.AtomName>(
	atom_name:A
):Book.Definition.Properties{
	return trx_client.book.get_properties_definition(atom_name);
}

export function has_property<A extends schema.AtomName>(atom_name:A, key:string)
		:boolean{
	return trx_client.book.has_property(atom_name, key);
}

export function get_names():schema.AtomName[]{
	return trx_client.book.get_names();
}

