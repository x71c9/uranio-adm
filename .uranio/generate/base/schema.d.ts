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
  export type AtomName = 'superuser' | 'user' | 'group' | 'media';
  export type AuthName = 'superuser' | 'user';
  export type LogName = never;
  type SuperuserShape = AtomCommonProperties & {
      email: string;
      password: string;
      groups: string[];
      favicon?: string;
  };
  type UserShape = AtomCommonProperties & {
      email: string;
      password: string;
      groups: string[];
  };
  type GroupShape = AtomCommonProperties & {
      name: string;
  };
  type MediaShape = AtomCommonProperties & {
      src: string;
      filename: string;
      type: string;
      size: number;
  };
  type BondProperties<A extends AtomName> = A extends 'superuser' ? 'groups' | 'favicon' : A extends 'user' ? 'groups' : A extends 'group' ? never : A extends 'media' ? never : never;
  type BondShapeDepth1<A extends AtomName> = A extends 'superuser' ? {
      groups: Atom<'group'>[];
      favicon?: Atom<'media'>;
  } : A extends 'user' ? {
      groups: Atom<'group'>[];
  } : A extends 'group' ? never : A extends 'media' ? never : never;
  type BondShapeDepth2<A extends AtomName> = A extends 'superuser' ? {
      groups: Molecule<'group', 1>[];
      favicon?: Molecule<'media', 1>;
  } : A extends 'user' ? {
      groups: Molecule<'group', 1>[];
  } : A extends 'group' ? never : A extends 'media' ? never : never;
  type BondShapeDepth3<A extends AtomName> = A extends 'superuser' ? {
      groups: Molecule<'group', 2>[];
      favicon?: Molecule<'media', 2>;
  } : A extends 'user' ? {
      groups: Molecule<'group', 2>[];
  } : A extends 'group' ? never : A extends 'media' ? never : never;
  type BondShapeDepth4<A extends AtomName> = A extends 'superuser' ? {
      groups: Molecule<'group', 3>[];
      favicon?: Molecule<'media', 3>;
  } : A extends 'user' ? {
      groups: Molecule<'group', 3>[];
  } : A extends 'group' ? never : A extends 'media' ? never : never;
  type Superuser = AtomHardProperties & SuperuserShape;
  type User = AtomHardProperties & UserShape;
  type Group = AtomHardProperties & GroupShape;
  type Media = AtomHardProperties & MediaShape;
  export type AtomShape<A extends AtomName> = A extends 'superuser' ? SuperuserShape : A extends 'user' ? UserShape : A extends 'group' ? GroupShape : A extends 'media' ? MediaShape : never;
  export type Atom<A extends AtomName> = A extends 'superuser' ? Superuser : A extends 'user' ? User : A extends 'group' ? Group : A extends 'media' ? Media : never;
  export type RouteCustomName<A extends AtomName> = A extends 'superuser' ? never : A extends 'user' ? never : A extends 'group' ? never : A extends 'media' ? never : A extends 'request' ? never : A extends 'error' ? never : never;
  export {};
  /** --uranio-generate-end */

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