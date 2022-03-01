/**
 * Module for Server Atom Book Methods
 *
 * @packageDocumentation
 */

import trx from 'uranio-trx';

import {Book} from '../typ/book';

import {Book as ClientBook} from '../typ/book_cln';

import {schema} from '../sch/server';

import * as book_client from './client';

export function get_route_definition<A extends schema.AtomName, R extends schema.RouteName<A>>(
	atom_name: A,
	route_name: R
):Book.Definition.Dock.Routes.Route<A,R>{
	return trx.book.get_route_definition(atom_name, route_name);
}

export function get_routes_definition<A extends schema.AtomName>(atom_name:A)
		:Book.Definition.Dock.Routes<A>{
	return trx.book.get_routes_definition(atom_name);
}

export function get_dock_definition<A extends schema.AtomName>(atom_name:A)
		:Book.Definition.Dock<A>{
	return book_client.get_dock_definition(atom_name) as Book.Definition.Dock<A>;
}

export function add_definition<A extends schema.AtomName>(
	atom_name:A,
	atom_definition:ClientBook.Definition
):ClientBook{
	return trx.book.add_definition(atom_name, atom_definition);
}

export function add_route_call<A extends schema.AtomName, R extends schema.RouteName<A>, D extends schema.Depth>(
	atom_name:A,
	route_name:R,
	route_call:Book.Definition.Dock.Routes.Route.Call<A,R,D>
):Book.Definition.Dock.Routes.Route<A,R,D>{
	// TODO check types error on route_call
	return trx.book.add_route_call<A,R,D>(atom_name, route_name, route_call as any);
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

export function get_custom_properties_definition<A extends schema.AtomName>(atom_name:A)
		:Book.Definition.Properties{
	return trx.book.get_custom_properties_definition(atom_name);
}

export function get_properties_defintion<A extends schema.AtomName>(atom_name:A)
		:Book.Definition.Properties{
	return trx.book.get_properties_definition(atom_name);
}

export function has_property<A extends schema.AtomName>(atom_name:A, key:string)
		:boolean{
	return trx.book.has_property(atom_name, key);
}

