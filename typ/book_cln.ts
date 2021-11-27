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

export type Book = {
	[k in urn_trx_client.types.AtomName]?: Book.Definition;
}

export namespace Book {
	
	export type BasicDefinition =
		Omit<urn_trx_client.types.Book.BasicDefinition, 'properties'> &
		{ properties: Definition.Properties }
	
	export type Definition =
		Book.BasicDefinition
	
	export namespace Definition {
		
		/**
		 * ** NOTE **
		 * For some reason it is not possible to use the following syntax.
		 * NuxtJS will fail in the browser.
		 * All namespace and types must be re-defined.
		 */
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		// export import Dock = urn_trx_client.types.Book.Definition.Dock;
		
		export type Dock = urn_trx_client.types.Book.Definition.Dock;
		
		export namespace Dock {
			export type Routes = urn_trx_client.types.Book.Definition.Dock.Routes;
			export namespace Routes {
				export type Route = urn_trx_client.types.Book.Definition.Dock.Routes.Route;
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
			
			export type ExtendedSharedFields = {
				sortable?: boolean,
				is_title?: boolean
			}
			
			export type ID = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.ID;
			export type Text = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Text;
			export type LongText = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.LongText;
			export type String = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.String;
			export type Number = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Number;
			export type Enum = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Enum;
			export type Set = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Set;
			export type DayTime = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.DayTime;
			export type Email = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Email;
			export type Integer = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Integer;
			export type Float = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Float;
			export type Binary = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Binary;
			export type Encrypted = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Encrypted;
			export type Day = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Day;
			export type Time = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Time;
			export type EnumString = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.EnumString;
			export type EnumNumber = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.EnumNumber;
			export type SetString = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.SetNumber;
			export type SetNumber = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.SetString;
			export type Atom = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.Atom;
			export type AtomArray = ExtendedSharedFields & urn_trx_client.types.Book.Definition.Property.AtomArray;
			export namespace Format {
				export type Float = urn_trx_client.types.Book.Definition.Property.Format.Float;
			}
			export namespace Validation {
				export type String = urn_trx_client.types.Book.Definition.Property.Validation.String;
				export type Number = urn_trx_client.types.Book.Definition.Property.Validation.Number;
				// export type Day = urn_trx_client.types.Book.Definition.Property.Validation.DayTime;
				// export type Time = urn_trx_client.types.Book.Definition.Property.Validation.DayTime;
				export type DayTime = urn_trx_client.types.Book.Definition.Property.Validation.DayTime;
				export type SetString = urn_trx_client.types.Book.Definition.Property.Validation.SetString;
				export type SetNumber = urn_trx_client.types.Book.Definition.Property.Validation.SetNumber;
				export type Atom = urn_trx_client.types.Book.Definition.Property.Validation.Atom;
			}
		}
	}
	
}
