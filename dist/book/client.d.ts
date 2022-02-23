/**
 * Module for Client Book Methods
 *
 * @packageDocumentation
 */
import { Book } from '../typ/book_cln';
import { schema } from '../sch/client';
export declare function get_route_def<A extends schema.AtomName, R extends schema.RouteName<A>>(atom_name: A, route_name: R): Book.Definition.Dock.Routes.Route;
export declare function get_routes_definition<A extends schema.AtomName>(atom_name: A): Book.Definition.Dock.Routes;
export declare function get_routes_definition_with_defaults(atom_name: schema.AtomName): Book.Definition.Dock.Routes;
export declare function get_dock_definition<A extends schema.AtomName>(atom_name: A): Book.Definition.Dock;
export declare function get_plural(atom_name: schema.AtomName): string;
export declare function validate_name(atom_name: string): atom_name is schema.AtomName;
export declare function validate_auth_name(auth_name: string): auth_name is schema.AuthName;
export declare function get_all_definitions(): Book;
export declare function get_definition<A extends schema.AtomName>(atom_name: A): Book.Definition;
export declare function get_property_definition<A extends schema.AtomName>(atom_name: A, property_name: keyof Book.Definition.Properties): Book.Definition.Property;
export declare function get_custom_property_definitions<A extends schema.AtomName>(atom_name: A): Book.Definition.Properties;
export declare function get_full_properties_definition<A extends schema.AtomName>(atom_name: A): Book.Definition.Properties;
export declare function has_property<A extends schema.AtomName>(atom_name: A, key: string): boolean;
export declare function get_names(): schema.AtomName[];
