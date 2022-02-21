/**
 * Client Book types module
 *
 * This module defines the type of the `atom_book` for the Client.
 *
 * In order to copy and reexport namespaces and types we use the syntax
 * `export import`.
 *
 * `type Book` must be re-defined.
 *
 * @packageDocumentation
 */
import urn_trx_client from 'uranio-trx/client';
import { schema } from '../sch/index';
export declare type Book = {
    [k in schema.AtomName]?: Book.Definition;
};
export declare namespace Book {
    type BasicDefinition = Omit<urn_trx_client.types.Book.Definition, 'properties'> & {
        properties: Definition.Properties;
        read_only?: boolean;
    };
    type Definition = Book.BasicDefinition;
    namespace Definition {
        /**
         * ** NOTE **
         * For some reason it is not possible to use the following syntax.
         * NuxtJS will fail in the browser.
         * All namespace and types must be re-defined.
         * Might work on Nuxt 3?
         */
        type Dock = urn_trx_client.types.Book.Definition.Dock;
        namespace Dock {
            type Routes = urn_trx_client.types.Book.Definition.Dock.Routes;
            namespace Routes {
                type Route = urn_trx_client.types.Book.Definition.Dock.Routes.Route;
            }
        }
        type Properties = {
            [k: string]: Property;
        };
        type Property = Property.ID | Property.Text | Property.LongText | Property.Email | Property.Integer | Property.Float | Property.Binary | Property.Encrypted | Property.Day | Property.Time | Property.SetString | Property.SetNumber | Property.EnumString | Property.EnumNumber | Property.Atom | Property.AtomArray;
        namespace Property {
            type AdminStyle = {
                full_width?: boolean;
                classes?: string;
            };
            type ExtendedSharedFields = {
                sortable?: boolean;
                is_title?: boolean;
                primary?: boolean;
                style?: AdminStyle;
            };
            type ID = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.ID;
            type Text = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Text;
            type LongText = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.LongText;
            type String = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.String;
            type Number = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Number;
            type Enum = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Enum;
            type Set = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Set;
            type DayTime = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.DayTime;
            type Email = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Email;
            type Integer = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Integer;
            type Float = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Float;
            type Binary = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Binary;
            type Encrypted = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Encrypted;
            type Day = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Day;
            type Time = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Time;
            type EnumString = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.EnumString;
            type EnumNumber = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.EnumNumber;
            type SetString = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.SetNumber;
            type SetNumber = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.SetString;
            type Atom = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Atom;
            type AtomArray = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.AtomArray;
            namespace Format {
                type Float = urn_trx_client.types.Book.Definition.Property.Format.Float;
            }
            namespace Validation {
                type String = urn_trx_client.types.Book.Definition.Property.Validation.String;
                type Number = urn_trx_client.types.Book.Definition.Property.Validation.Number;
                type DayTime = urn_trx_client.types.Book.Definition.Property.Validation.DayTime;
                type SetString = urn_trx_client.types.Book.Definition.Property.Validation.SetString;
                type SetNumber = urn_trx_client.types.Book.Definition.Property.Validation.SetNumber;
                type Atom = urn_trx_client.types.Book.Definition.Property.Validation.Atom;
            }
        }
    }
}
