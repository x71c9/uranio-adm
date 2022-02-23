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
import trx_client from 'uranio-trx/client';
import { schema } from '../sch/client';
export declare type Book = {
    [k in schema.AtomName]?: Book.Definition;
};
export declare namespace Book {
    type Definition = Omit<trx_client.types.Book.Definition, 'properties'> & {
        properties: Definition.Properties;
        read_only?: boolean;
    };
    namespace Definition {
        type Dock = trx_client.types.Book.Definition.Dock;
        namespace Dock {
            type Routes = trx_client.types.Book.Definition.Dock.Routes;
            namespace Routes {
                type Route = trx_client.types.Book.Definition.Dock.Routes.Route;
                type Params = trx_client.types.Book.Definition.Dock.Routes.Params;
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
            type ID = ExtendedSharedFields & trx_client.types.Book.Definition.Property.ID;
            type Text = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Text;
            type LongText = ExtendedSharedFields & trx_client.types.Book.Definition.Property.LongText;
            type String = ExtendedSharedFields & trx_client.types.Book.Definition.Property.String;
            type Number = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Number;
            type Enum = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Enum;
            type Set = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Set;
            type DayTime = ExtendedSharedFields & trx_client.types.Book.Definition.Property.DayTime;
            type Email = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Email;
            type Integer = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Integer;
            type Float = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Float;
            type Binary = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Binary;
            type Encrypted = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Encrypted;
            type Day = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Day;
            type Time = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Time;
            type EnumString = ExtendedSharedFields & trx_client.types.Book.Definition.Property.EnumString;
            type EnumNumber = ExtendedSharedFields & trx_client.types.Book.Definition.Property.EnumNumber;
            type SetString = ExtendedSharedFields & trx_client.types.Book.Definition.Property.SetNumber;
            type SetNumber = ExtendedSharedFields & trx_client.types.Book.Definition.Property.SetString;
            type Atom = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Atom;
            type AtomArray = ExtendedSharedFields & trx_client.types.Book.Definition.Property.AtomArray;
            namespace Format {
                type Float = trx_client.types.Book.Definition.Property.Format.Float;
            }
            namespace Validation {
                type String = trx_client.types.Book.Definition.Property.Validation.String;
                type Number = trx_client.types.Book.Definition.Property.Validation.Number;
                type DayTime = trx_client.types.Book.Definition.Property.Validation.DayTime;
                type SetString = trx_client.types.Book.Definition.Property.Validation.SetString;
                type SetNumber = trx_client.types.Book.Definition.Property.Validation.SetNumber;
                type Atom = trx_client.types.Book.Definition.Property.Validation.Atom;
            }
        }
    }
}
