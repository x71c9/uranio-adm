declare module 'uranio-schema/dev' {
  /**
   * Run module for testing
   * Entry point for `yarn dev` `npm run dev` command.
   *
   * @packageDocumentation
   */
  export {};

}
declare module 'uranio-schema/index' {
  /**
   * Index module
   *
   * @packageDocumentation
   */
  import * as urn_schema from 'uranio-schema/main';
  export default urn_schema;

}
declare module 'uranio-schema/main' {
  /**
   * Main module
   *
   * @packageDocumentation
   */
  export * from 'uranio-schema/typ/index';

}
declare module 'uranio-schema/typ/atom' {
  /**
   * Atom types module
   *
   * This modules defines all the Atom types.
   * Here are defined only the essential Atoms. Uranio CLI will replace this file
   * with the full list of essential and user-defined atoms.
   *
   * An `Atom` type is composed by:
   * - `atom_hard_properties`: the common properties that are generated when
   *      saved to the db: _id, _date
   * - `atom_common_properties`: the common properties for each Atom
   * - and the properties defined by the developer.
   *
   * An `AtomShape` is an `Atom` without the `atom_hard_properties`.
   *
   * A `Molecule` is an `Atom` with all its Atom-type-properties populated with
   * other Atoms.
   *
   * @packageDocumentation
   */
  import { AtomHardProperties, AtomCommonProperties } from 'uranio-schema/typ/common';
  export type Depth = undefined | 0 | 1 | 2 | 3;
  type PrimitiveShape<A extends AtomName> = Omit<AtomShape<A>, BondProperties<A>>;
  type BondPrimitiveShape<A extends AtomName> = BondProperties<A> extends keyof AtomShape<A> ? Pick<AtomShape<A>, BondProperties<A>> : never;
  type AtomPrimitiveShape<A extends AtomName> = PrimitiveShape<A>;
  type BondShape<A extends AtomName, D extends Depth> = D extends (0 | undefined) ? BondPrimitiveShape<A> : D extends 1 ? BondShapeDepth1<A> : D extends 2 ? BondShapeDepth2<A> : D extends 3 ? BondShapeDepth3<A> : D extends 4 ? BondShapeDepth4<A> : never;
  export type Molecule<A extends AtomName, D extends Depth = 0> = D extends (0 | undefined) ? Atom<A> : AtomHardProperties & AtomCommonProperties & AtomPrimitiveShape<A> & BondShape<A, D>;
  export type AuthAtom<A extends AuthName> = Atom<A>;
  export type AuthAtomShape<A extends AuthName> = AtomShape<A>;
  /** --uranio-generate-start */

	export type AtomName = 'superuser' | 'user' | 'group' | 'media' | 'error' | 'request' | 'setting'

	export type AuthName = 'superuser' | 'user'

	export type LogName = 'error' | 'request'

	type SuperuserShape = AtomCommonProperties & {
		email: string
		password: string
		groups?: string[]
	}

	type UserShape = AtomCommonProperties & {
		email: string
		password: string
		groups?: string[]
	}

	type GroupShape = AtomCommonProperties & {
		name: string
	}

	type MediaShape = AtomCommonProperties & {
		src: string
		filename: string
		type: string
		size: number
		width?: number
		height?: number
	}

	type ErrorShape = AtomCommonProperties & {
		status: number
		msg: string
		error_code: string
		error_msg: string
		request?: string
		stack?: string
	}

	type RequestShape = AtomCommonProperties & {
		full_path: string
		route_path?: string
		atom_path?: string
		connection_path?: string
		method?: string
		atom_name?: string
		route_name?: string
		params?: string
		query?: string
		headers?: string
		body?: string
		file?: string
		ip?: string
		is_auth?: boolean
		auth_action?: string
	}

	type SettingShape = AtomCommonProperties & {
		name: string
	}

	type BondProperties<A extends AtomName> =
		A extends 'superuser' ? 'groups' :
		A extends 'user' ? 'groups' :
		A extends 'group' ? never :
		A extends 'media' ? never :
		A extends 'error' ? 'request' :
		A extends 'request' ? never :
		A extends 'setting' ? never :
		never

	type BondShapeDepth1<A extends AtomName> =
		A extends 'superuser' ? {groups?: Atom<'group'>[]} :
		A extends 'user' ? {groups?: Atom<'group'>[]} :
		A extends 'group' ? Record<never, unknown> :
		A extends 'media' ? Record<never, unknown> :
		A extends 'error' ? {request?: Atom<'request'>} :
		A extends 'request' ? Record<never, unknown> :
		A extends 'setting' ? Record<never, unknown> :
		never

	type BondShapeDepth2<A extends AtomName> =
		A extends 'superuser' ? {groups?: Molecule<'group', 1>[]} :
		A extends 'user' ? {groups?: Molecule<'group', 1>[]} :
		A extends 'group' ? Record<never, unknown> :
		A extends 'media' ? Record<never, unknown> :
		A extends 'error' ? {request?: Molecule<'request', 1>} :
		A extends 'request' ? Record<never, unknown> :
		A extends 'setting' ? Record<never, unknown> :
		never

	type BondShapeDepth3<A extends AtomName> =
		A extends 'superuser' ? {groups?: Molecule<'group', 2>[]} :
		A extends 'user' ? {groups?: Molecule<'group', 2>[]} :
		A extends 'group' ? Record<never, unknown> :
		A extends 'media' ? Record<never, unknown> :
		A extends 'error' ? {request?: Molecule<'request', 2>} :
		A extends 'request' ? Record<never, unknown> :
		A extends 'setting' ? Record<never, unknown> :
		never

	type BondShapeDepth4<A extends AtomName> =
		A extends 'superuser' ? {groups?: Molecule<'group', 3>[]} :
		A extends 'user' ? {groups?: Molecule<'group', 3>[]} :
		A extends 'group' ? Record<never, unknown> :
		A extends 'media' ? Record<never, unknown> :
		A extends 'error' ? {request?: Molecule<'request', 3>} :
		A extends 'request' ? Record<never, unknown> :
		A extends 'setting' ? Record<never, unknown> :
		never

	type Superuser = AtomHardProperties & SuperuserShape

	type User = AtomHardProperties & UserShape

	type Group = AtomHardProperties & GroupShape

	type Media = AtomHardProperties & MediaShape

	type Error = AtomHardProperties & ErrorShape

	type Request = AtomHardProperties & RequestShape

	type Setting = AtomHardProperties & SettingShape

	export type AtomShape<A extends AtomName> =
		A extends 'superuser' ? SuperuserShape :
		A extends 'user' ? UserShape :
		A extends 'group' ? GroupShape :
		A extends 'media' ? MediaShape :
		A extends 'error' ? ErrorShape :
		A extends 'request' ? RequestShape :
		A extends 'setting' ? SettingShape :
		never

	export type Atom<A extends AtomName> =
		A extends 'superuser' ? Superuser :
		A extends 'user' ? User :
		A extends 'group' ? Group :
		A extends 'media' ? Media :
		A extends 'error' ? Error :
		A extends 'request' ? Request :
		A extends 'setting' ? Setting :
		never


	type RouteDefaultName = 'count' | 'find_one' | 'find' | 'find_id' | 'insert' | 'update' | 'delete' | 'insert_multiple' | 'update_multiple' | 'delete_multiple'

	type RouteCustomName<A extends AtomName> =
		A extends 'superuser' ? never :
		A extends 'user' ? never :
		A extends 'group' ? never :
		A extends 'media' ? never :
		A extends 'error' ? never :
		A extends 'request' ? never :
		A extends 'setting' ? never :
	never

	export type RouteName<A extends AtomName> =
		RouteCustomName<A> | RouteDefaultName;

	type DefaultRouteURL<A extends AtomName, R extends RouteName<A>> =
		R extends 'count' ? '/count' :
		R extends 'find_one' ? '/first' :
		R extends 'find' ? '/' :
		R extends 'find_id' ? '/:id' :
		R extends 'insert' ? '/' :
		R extends 'update' ? '/:id' :
		R extends 'delete' ? '/:id' :
		R extends 'insert_multiple' ? '/multiple' :
		R extends 'update_multiple' ? '/multiple/:ids' :
		R extends 'delete_multiple' ? '/multiple/:ids' :
		never

	type CustomRouteURL<A extends AtomName, R extends RouteCustomName<A>> =
		A extends 'superuser' ? never :
		A extends 'user' ? never :
		A extends 'group' ? never :
		A extends 'media' ? never :
		A extends 'error' ? never :
		A extends 'request' ? never :
		A extends 'setting' ? never :
	never

	export type RouteURL<A extends AtomName, R extends RouteName<A>> =
		R extends RouteCustomName<A> ? CustomRouteURL<A,R> :
		R extends RouteName<A> ? DefaultRouteURL<A,R> :
		never

	type DefaultRouteQueryParam<R extends RouteDefaultName> =
		R extends 'count' ? 'filter' :
		R extends 'find_one' ? 'filter' | 'options' :
		R extends 'find' ? 'filter' | 'options' :
		R extends 'find_id' ? 'options' :
		R extends 'insert' ? never :
		R extends 'update' ? never :
		R extends 'delete' ? never :
		R extends 'insert_multiple' ? never :
		R extends 'update_multiple' ? never :
		R extends 'delete_multiple' ? never :
		never

	type CustomRouteQueryParam<A extends AtomName, R extends RouteCustomName<A>> =
		A extends 'superuser' ? never :
		A extends 'user' ? never :
		A extends 'group' ? never :
		A extends 'media' ? never :
		A extends 'error' ? never :
		A extends 'request' ? never :
		A extends 'setting' ? never :
	never

	export type RouteQueryParam<A extends AtomName, R extends RouteName<A>> =
		R extends RouteDefaultName ? DefaultRouteQueryParam<R> :
		R extends RouteCustomName<A> ?
		CustomRouteQueryParam<A,R> extends string ? CustomRouteQueryParam<A,R> :
		never :
		never


import {urn_response} from 'urn-lib';
	type DefaultResponse<A extends AtomName, R extends RouteName<A>, D extends Depth = 0> =
		R extends 'count' ? urn_response.General<number, any> :
		R extends 'find_id' ? urn_response.General<Molecule<A,D>,any> :
		R extends 'find' ? urn_response.General<Molecule<A,D>[],any> :
		R extends 'find_one' ? urn_response.General<Molecule<A,D>,any> :
		R extends 'insert' ? urn_response.General<Molecule<A,D>,any> :
		R extends 'update' ? urn_response.General<Molecule<A,D>,any> :
		R extends 'delete' ? urn_response.General<Molecule<A,D>,any> :
		R extends 'insert_multiple' ? urn_response.General<Molecule<A,D>[],any> :
		R extends 'update_multiple' ? urn_response.General<Molecule<A,D>[],any> :
		R extends 'delete_multiple' ? urn_response.General<Molecule<A,D>[],any> :
		// R extends 'upload' ? urn_response.General<Molecule<A,D>,any> :
		// R extends 'presigned' ? urn_response.General<string,any> :
		never;

	type CustomResponse<A extends AtomName, R extends RouteName<A>, D extends Depth = 0> =
		A extends 'superuser' ?
			never :
		A extends 'user' ?
			never :
		A extends 'group' ?
			never :
		A extends 'media' ?
			never :
		A extends 'error' ?
			never :
		A extends 'request' ?
			never :
		A extends 'setting' ?
			never :
			never

	export type Response<A extends AtomName, R extends RouteName<A>, D extends Depth = 0> =
		R extends RouteDefaultName ? DefaultResponse<A,R,D> :
		R extends RouteCustomName<A> ? CustomResponse<A,R,D> :
		never

	export {};/** --uranio-generate-end */

}
declare module 'uranio-schema/typ/common' {
  /**
   * Common types module
   *
   * @packageDocumentation
   */
  export type AtomHardProperties = {
      _id: string;
      _date: Date;
  };
  export type AtomCommonProperties = {
      _r?: string;
      _w?: string;
      _deleted_from?: string;
  };

}
declare module 'uranio-schema/typ/index' {
  /**
   * Index module for types
   *
   * @packageDocumentation
   */
  export * from 'uranio-schema/typ/atom';
  export * from 'uranio-schema/typ/query';

}
declare module 'uranio-schema/typ/query' {
  /**
   * Query type module
   *
   * @packageDocumentation
   */
  import { AtomHardProperties, AtomCommonProperties } from 'uranio-schema/typ/common';
  import * as atoms from 'uranio-schema/typ/atom';
  export type Query<A extends atoms.AtomName> = Query.Expression<A> | Query.Logical<A>;
  export namespace Query {
      type QueryAtomKey<A extends atoms.AtomName> = keyof AtomHardProperties | keyof AtomCommonProperties | keyof atoms.Atom<A>;
      type QueryAtomRealType<A extends atoms.AtomName, P extends QueryAtomKey<A>> = P extends keyof AtomHardProperties ? AtomHardProperties[P] : P extends keyof AtomCommonProperties ? AtomCommonProperties[P] : P extends keyof atoms.Atom<A> ? atoms.Atom<A>[P] : never;
      export type Equal<A extends atoms.AtomName> = {
          [P in QueryAtomKey<A>]?: QueryAtomRealType<A, P>;
      };
      type Comparsion<T> = {
          $eq?: T;
      } | {
          $gt?: T;
      } | {
          $gte?: T;
      } | {
          $in?: T[];
      } | {
          $lt?: T;
      } | {
          $lte?: T;
      } | {
          $ne?: T;
      } | {
          $nin?: T[];
      } | {
          $exists: boolean;
      };
      type WithComparsion<A extends atoms.AtomName> = {
          [P in QueryAtomKey<A>]?: Comparsion<QueryAtomRealType<A, P>>;
      };
      export type Expression<A extends atoms.AtomName> = Equal<A> | WithComparsion<A>;
      export type Logical<A extends atoms.AtomName> = {
          $and?: (Expression<A> | Logical<A>)[];
      } | {
          $not?: Expression<A> | Logical<A>;
      } | {
          $nor?: (Expression<A> | Logical<A>)[];
      } | {
          $or?: (Expression<A> | Logical<A>)[];
      };
      export type Options<A extends atoms.AtomName, D extends atoms.Depth = 0> = {
          depth?: D;
          sort?: string | Equal<A>;
          limit?: number;
          skip?: number;
          depth_query?: Query<A>;
      };
      export {};
  }

}
declare module 'uranio-schema' {
  import main = require('uranio-schema/index');
  export = main;
}
