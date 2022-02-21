"use strict";
/**
 * Re-export API types module
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAction = exports.PermissionType = exports.SecurityType = exports.PropertyType = void 0;
var types_1 = require("uranio-api/types");
Object.defineProperty(exports, "PropertyType", { enumerable: true, get: function () { return types_1.PropertyType; } });
Object.defineProperty(exports, "SecurityType", { enumerable: true, get: function () { return types_1.SecurityType; } });
Object.defineProperty(exports, "PermissionType", { enumerable: true, get: function () { return types_1.PermissionType; } });
Object.defineProperty(exports, "AuthAction", { enumerable: true, get: function () { return types_1.AuthAction; } });
// import api from 'uranio-api';
// import {schema} from '../sch/index';
// export namespace Api {
//   export type AuthResponse = api.types.Api.AuthResponse;
//   export type Request<A extends schema.AtomName, R extends schema.RouteName<A>, D extends schema.Depth = 0> =
//     api.types.Api.Request<A,R,D>
//   export namespace Request {
//     export type File = api.types.Api.Request.File;
//     export type Paths = api.types.Api.Request.Paths;
//     export type Headers = api.types.Api.Request.Headers;
//     export type Params<A extends schema.AtomName, R extends schema.RouteName<A>> =
//       api.types.Api.Request.Params<A,R>
//     export type Query<A extends schema.AtomName, R extends schema.RouteName<A>, D extends schema.Depth = 0> =
//       api.types.Api.Request.Query<A,R,D>
//     export type Body<A extends schema.AtomName, R extends schema.RouteName<A>> =
//       api.types.Api.Request.Body<A,R>
//   }
// }
// export type RouteParam<A extends schema.AtomName, R extends schema.RouteName<A>> =
//   api.types.RouteParam<A,R>;
//# sourceMappingURL=api_cln.js.map