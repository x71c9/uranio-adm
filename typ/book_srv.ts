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
		{ properties: book_cln.Book.Definition.Properties }
	
	export type Definition<A extends urn_trx.types.AtomName> =
		Omit<urn_trx.types.Book.Definition<A>, keyof Book.BasicDefinition<A>> &
		Book.BasicDefinition<A>;
	
	export namespace Definition {
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		export import Security = urn_trx.types.Book.Definition.Security;
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		export import Dock = urn_trx.types.Book.Definition.Dock;
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		export import Bll = urn_trx.types.Book.Definition.Bll;
		
		
		// Exporting the types that has been overwritten in Book client.
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		export import Properties = book_cln.Book.Definition.Properties;
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		export import Property = book_cln.Book.Definition.Property;
		
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
