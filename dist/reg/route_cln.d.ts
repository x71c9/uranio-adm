/**
 * Register module
 *
 * @packageDocumentation
 */
import * as types from '../cln/types';
import { schema } from '../sch/client';
export declare function route<A extends schema.AtomName, R extends schema.RouteName<A>>(route: types.Book.Definition.Dock.Routes.Route, atom_name?: A, route_name?: R): string;
