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

import urn_trx from 'uranio-trx';

import * as book_cln from './book_cln';

export type Book = {
	[k in urn_trx.types.AtomName]?: Book.Definition<k>;
}

export namespace Book {
	
	export type BasicDefinition<A extends urn_trx.types.AtomName> =
		Omit<urn_trx.types.Book.BasicDefinition<A>, 'properties'> &
		{
			properties: book_cln.Book.Definition.Properties
			read_only?: boolean
		}
	
	export type Definition<A extends urn_trx.types.AtomName> =
		Omit<urn_trx.types.Book.Definition<A>, keyof Book.BasicDefinition<A>> &
		Book.BasicDefinition<A>;
	
	export namespace Definition {
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		// export import Security = urn_trx.types.Book.Definition.Security;
		
		export type Security = urn_trx.types.Book.Definition.Security;
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		// export import Dock = urn_trx.types.Book.Definition.Dock;
		
		export type Dock<A extends urn_trx.types.AtomName> = urn_trx.types.Book.Definition.Dock<A>;
		
		export namespace Dock {
			
			export type Routes<A extends urn_trx.types.AtomName> = urn_trx.types.Book.Definition.Dock.Routes<A>;
			
			export namespace Routes {
				
				export type Route<A extends urn_trx.types.AtomName, R extends urn_trx.types.RouteName<A>, D extends urn_trx.types.Depth = 0> =
					urn_trx.types.Book.Definition.Dock.Routes.Route<A, R, D>
				
				export namespace Route {
					export type Call<A extends urn_trx.types.AtomName, R extends urn_trx.types.RouteName<A>, D extends urn_trx.types.Depth = 0> =
						urn_trx.types.Book.Definition.Dock.Routes.Route<A, R, D>
				}
				
			}
		}
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		// export import Bll = urn_trx.types.Book.Definition.Bll;
		
		export type Bll<A extends urn_trx.types.AtomName> = urn_trx.types.Book.Definition.Bll<A>;
		
		
		// Exporting the types that has been overwritten in Book client.
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		// export import Properties = book_cln.Book.Definition.Properties;
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		// export import Property = book_cln.Book.Definition.Property;
		
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
//       type: urn_trx.types.BookSecurityType.UNIFORM,
//       _w: urn_trx.types.BookPermissionType.PUBLIC
//     },
//     properties: {
//       first_name: {
//         sortable: false,
//         type: urn_trx.types.BookPropertyType.TEXT,
//         label: 'First name'
//       },
//       last_name: {
//         type: urn_trx.types.BookPropertyType.TEXT,
//         label: 'Last name',
//         is_title: true
//       }
//     },
//     dock:{
//       url: '/customers',
//       routes:{
//         pippi:{
//           method: urn_trx.types.RouteMethod.GET,
//           action: urn_trx.types.AuthAction.READ,
//           url: '/pippo',
//           return: Number,
//           call: async (req:urn_trx.types.Api.Request<'customer', 'pippi'>):Promise<number> => {
//             console.log(req.route_name);
//             return 899;
//           }
//         }
//       }
//     }
//   },
// };
