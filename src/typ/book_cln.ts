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

// import {schema} from '../sch/client';

export type Book = {
	[k:string]: Book.Definition;
}

export namespace Book {
	
	export type Definition =
		Omit<trx_client.types.Book.Definition, 'properties'> &
		{
			properties: Definition.Properties
			read_only?: boolean
		}
	
	export namespace Definition {
		
		export type Dock =
			trx_client.types.Book.Definition.Dock
		
		export namespace Dock {
			
			export type Routes =
				trx_client.types.Book.Definition.Dock.Routes
			
			export namespace Routes {
				
				export type Route =
					trx_client.types.Book.Definition.Dock.Routes.Route
				
				export type Params =
					trx_client.types.Book.Definition.Dock.Routes.Params
				
			}
			
		}

		export type Properties = {
			[k:string]: Property
		}
		
		export type Property =
			Property.ID |
			Property.Text |
			Property.LongText |
			Property.Email |
			Property.Integer |
			Property.Float |
			Property.Binary |
			Property.Encrypted |
			Property.Day |
			Property.Time |
			Property.SetString |
			Property.SetNumber |
			Property.EnumString |
			Property.EnumNumber |
			Property.Atom |
			Property.AtomArray;
		
		export namespace Property {
			
			export type AdminStyle = {
				full_width?: boolean
				classes?: string
			}
			
			export type ExtendedSharedFields = {
				sortable?: boolean
				is_title?: boolean
				primary?: boolean
				style?: AdminStyle
			}
			
			export type ID = ExtendedSharedFields & trx_client.types.Book.Definition.Property.ID;
			export type Text = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Text;
			export type LongText = ExtendedSharedFields & trx_client.types.Book.Definition.Property.LongText;
			export type String = ExtendedSharedFields & trx_client.types.Book.Definition.Property.String;
			export type Number = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Number;
			export type Enum = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Enum;
			export type Set = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Set;
			export type DayTime = ExtendedSharedFields & trx_client.types.Book.Definition.Property.DayTime;
			export type Email = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Email;
			export type Integer = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Integer;
			export type Float = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Float;
			export type Binary = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Binary;
			export type Encrypted = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Encrypted;
			export type Day = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Day;
			export type Time = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Time;
			export type EnumString = ExtendedSharedFields & trx_client.types.Book.Definition.Property.EnumString;
			export type EnumNumber = ExtendedSharedFields & trx_client.types.Book.Definition.Property.EnumNumber;
			export type SetString = ExtendedSharedFields & trx_client.types.Book.Definition.Property.SetNumber;
			export type SetNumber = ExtendedSharedFields & trx_client.types.Book.Definition.Property.SetString;
			export type Atom = ExtendedSharedFields & trx_client.types.Book.Definition.Property.Atom;
			export type AtomArray = ExtendedSharedFields & trx_client.types.Book.Definition.Property.AtomArray;
			export namespace Format {
				export type Float = trx_client.types.Book.Definition.Property.Format.Float;
			}
			export namespace Validation {
				export type String = trx_client.types.Book.Definition.Property.Validation.String;
				export type Number = trx_client.types.Book.Definition.Property.Validation.Number;
				export type DayTime = trx_client.types.Book.Definition.Property.Validation.DayTime;
				export type SetString = trx_client.types.Book.Definition.Property.Validation.SetString;
				export type SetNumber = trx_client.types.Book.Definition.Property.Validation.SetNumber;
				export type Atom = trx_client.types.Book.Definition.Property.Validation.Atom;
			}
		}
	}
	
}
