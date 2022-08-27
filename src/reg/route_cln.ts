/**
 * Register module
 *
 * @packageDocumentation
 */

import trx_client from 'uranio-trx/client';

import * as types from '../cln/types';

import {schema} from '../sch/client';

export function route<A extends schema.AtomName, R extends schema.RouteName<A>>(
	route: types.Book.Definition.Dock.Routes.Route,
	atom_name?: A,
	route_name?: R
):string{
	return trx_client.register.route(route, atom_name, route_name);
}
