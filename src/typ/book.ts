/**
 * Server book type module
 *
 * This module defines the type of the `atom_book` for the Server.
 * It extends the defintion of the Client Book type.
 *
 * In order to copy and reexport namespaces and types we use the syntax
 * `export import`.
 *
 * `type Book` must be re-defined.
 *
 * @packageDocumentation
 */

import trx from 'uranio-trx';

import {schema} from '../sch/server';

import * as book_cln from './book_cln';

export type Book = {
	[k in schema.AtomName]?: Book.Definition<k>;
}

export namespace Book {
	
	export type BasicDefinition<A extends schema.AtomName> =
		Omit<trx.types.Book.Definition<A>, 'properties'> &
		{
			properties: book_cln.Book.Definition.Properties
			read_only?: boolean
		}
	
	export type Definition<A extends schema.AtomName> =
		Omit<trx.types.Book.Definition<A>, keyof Book.BasicDefinition<A>> &
		Book.BasicDefinition<A>;
	
	export namespace Definition {
		
		export type Security = trx.types.Book.Definition.Security;
		
		export type Dock<A extends schema.AtomName> = trx.types.Book.Definition.Dock<A>;
		
		export namespace Dock {
			
			export type Routes<A extends schema.AtomName> = trx.types.Book.Definition.Dock.Routes<A>;
			
			export namespace Routes {
				
				export type Route<A extends schema.AtomName, R extends schema.RouteName<A>, D extends schema.Depth = 0> =
					trx.types.Book.Definition.Dock.Routes.Route<A, R, D>
				
				export namespace Route {
					export type Call<A extends schema.AtomName, R extends schema.RouteName<A>, D extends schema.Depth = 0> =
						trx.types.Book.Definition.Dock.Routes.Route<A, R, D>
				}
				
			}
		}
		
		export type Bll<A extends schema.AtomName> = trx.types.Book.Definition.Bll<A>;
		
		export type Property = book_cln.Book.Definition.Property;
		
		export type Properties = book_cln.Book.Definition.Properties;
		
		export namespace Property {
			export type AdminStyle = book_cln.Book.Definition.Property.AdminStyle;
			export type ExtendedSharedFields = book_cln.Book.Definition.Property.ExtendedSharedFields;
			export type ID = book_cln.Book.Definition.Property.ID;
			export type Text = book_cln.Book.Definition.Property.Text;
			export type LongText = book_cln.Book.Definition.Property.LongText;
			export type String = book_cln.Book.Definition.Property.String;
			export type Number = book_cln.Book.Definition.Property.Number;
			export type Enum = book_cln.Book.Definition.Property.Enum;
			export type Set = book_cln.Book.Definition.Property.Set;
			export type DayTime = book_cln.Book.Definition.Property.DayTime;
			export type Email = book_cln.Book.Definition.Property.Email;
			export type Integer = book_cln.Book.Definition.Property.Integer;
			export type Float = book_cln.Book.Definition.Property.Float;
			export type Binary = book_cln.Book.Definition.Property.Binary;
			export type Encrypted = book_cln.Book.Definition.Property.Encrypted;
			export type Day = book_cln.Book.Definition.Property.Day;
			export type Time = book_cln.Book.Definition.Property.Time;
			export type EnumString = book_cln.Book.Definition.Property.EnumString;
			export type EnumNumber = book_cln.Book.Definition.Property.EnumNumber;
			export type SetString = book_cln.Book.Definition.Property.SetNumber;
			export type SetNumber = book_cln.Book.Definition.Property.SetString;
			export type Atom = book_cln.Book.Definition.Property.Atom;
			export type AtomArray = book_cln.Book.Definition.Property.AtomArray;
			export namespace Format {
				export type Float = book_cln.Book.Definition.Property.Format.Float;
			}
			export namespace Validation {
				export type String = book_cln.Book.Definition.Property.Validation.String;
				export type Number = book_cln.Book.Definition.Property.Validation.Number;
				export type DayTime = book_cln.Book.Definition.Property.Validation.DayTime;
				export type SetString = book_cln.Book.Definition.Property.Validation.SetString;
				export type SetNumber = book_cln.Book.Definition.Property.Validation.SetNumber;
				export type Atom = book_cln.Book.Definition.Property.Validation.Atom;
			}
		}
	}
	
}

// export const atom_book:Book = {
//   customer:{
//     plural: 'customers',
//     security:{
//       type: trx.types.BookSecurityType.UNIFORM,
//       _w: trx.types.BookPermissionType.PUBLIC
//     },
//     properties: {
//       first_name: {
//         sortable: false,
//         type: trx.types.BookPropertyType.TEXT,
//         label: 'First name'
//       },
//       last_name: {
//         type: trx.types.BookPropertyType.TEXT,
//         label: 'Last name',
//         is_title: true
//       }
//     },
//     dock:{
//       url: '/customers',
//       routes:{
//         pippi:{
//           method: trx.types.RouteMethod.GET,
//           action: trx.types.AuthAction.READ,
//           url: '/pippo',
//           return: Number,
//           call: async (req:trx.types.Api.Request<'customer', 'pippi'>):Promise<number> => {
//             console.log(req.route_name);
//             return 899;
//           }
//         }
//       }
//     }
//   },
// };
