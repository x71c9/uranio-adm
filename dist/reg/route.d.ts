/**
 * Register module
 *
 * @packageDocumentation
 */
import * as types from '../server/types';
import { schema } from '../sch/server';
export declare function route<A extends schema.AtomName, R extends schema.RouteName<A>, D extends schema.Depth>(route: types.Book.Definition.Dock.Routes.Route<A, R, D>, atom_name?: A, route_name?: R): string;
