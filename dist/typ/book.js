"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=book.js.map