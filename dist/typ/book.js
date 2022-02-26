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
//# sourceMappingURL=book.js.map