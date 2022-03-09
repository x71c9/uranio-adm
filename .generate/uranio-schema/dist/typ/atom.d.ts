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
import { AtomHardProperties, AtomCommonProperties } from './common';
export declare type Depth = undefined | 0 | 1 | 2 | 3;
declare type PrimitiveShape<A extends AtomName> = Omit<AtomShape<A>, BondProperties<A>>;
declare type BondPrimitiveShape<A extends AtomName> = BondProperties<A> extends keyof AtomShape<A> ? Pick<AtomShape<A>, BondProperties<A>> : never;
declare type AtomPrimitiveShape<A extends AtomName> = PrimitiveShape<A>;
declare type BondShape<A extends AtomName, D extends Depth> = D extends (0 | undefined) ? BondPrimitiveShape<A> : D extends 1 ? BondShapeDepth1<A> : D extends 2 ? BondShapeDepth2<A> : D extends 3 ? BondShapeDepth3<A> : D extends 4 ? BondShapeDepth4<A> : never;
export declare type Molecule<A extends AtomName, D extends Depth = 0> = D extends (0 | undefined) ? Atom<A> : AtomHardProperties & AtomCommonProperties & AtomPrimitiveShape<A> & BondShape<A, D>;
export declare type AuthAtom<A extends AuthName> = Atom<A>;
export declare type AuthAtomShape<A extends AuthName> = AtomShape<A>;
/** --uranio-generate-start */

export declare type AtomName = 'superuser' | 'user' | 'group' | 'media' | 'error' | 'request' | 'setting'

export declare type AuthName = 'superuser' | 'user'

export declare type LogName = 'error' | 'request'

declare type SuperuserShape = AtomCommonProperties & {
	email: string
	password: string
	groups?: string[]
}

declare type UserShape = AtomCommonProperties & {
	email: string
	password: string
	groups?: string[]
}

declare type GroupShape = AtomCommonProperties & {
	name: string
}

declare type MediaShape = AtomCommonProperties & {
	src: string
	filename: string
	type: string
	size: number
	width?: number
	height?: number
}

declare type ErrorShape = AtomCommonProperties & {
	status: number
	msg: string
	error_code: string
	error_msg: string
	request?: string
	stack?: string
}

declare type RequestShape = AtomCommonProperties & {
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

declare type SettingShape = AtomCommonProperties & {
	name: string
}

declare type BondProperties<A extends AtomName> =
	A extends 'superuser' ? 'groups' :
	A extends 'user' ? 'groups' :
	A extends 'group' ? never :
	A extends 'media' ? never :
	A extends 'error' ? 'request' :
	A extends 'request' ? never :
	A extends 'setting' ? never :
	never

declare type BondShapeDepth1<A extends AtomName> =
	A extends 'superuser' ? {groups?: Atom<'group'>[]} :
	A extends 'user' ? {groups?: Atom<'group'>[]} :
	A extends 'group' ? Record<never, unknown> :
	A extends 'media' ? Record<never, unknown> :
	A extends 'error' ? {request?: Atom<'request'>} :
	A extends 'request' ? Record<never, unknown> :
	A extends 'setting' ? Record<never, unknown> :
	never

declare type BondShapeDepth2<A extends AtomName> =
	A extends 'superuser' ? {groups?: Molecule<'group', 1>[]} :
	A extends 'user' ? {groups?: Molecule<'group', 1>[]} :
	A extends 'group' ? Record<never, unknown> :
	A extends 'media' ? Record<never, unknown> :
	A extends 'error' ? {request?: Molecule<'request', 1>} :
	A extends 'request' ? Record<never, unknown> :
	A extends 'setting' ? Record<never, unknown> :
	never

declare type BondShapeDepth3<A extends AtomName> =
	A extends 'superuser' ? {groups?: Molecule<'group', 2>[]} :
	A extends 'user' ? {groups?: Molecule<'group', 2>[]} :
	A extends 'group' ? Record<never, unknown> :
	A extends 'media' ? Record<never, unknown> :
	A extends 'error' ? {request?: Molecule<'request', 2>} :
	A extends 'request' ? Record<never, unknown> :
	A extends 'setting' ? Record<never, unknown> :
	never

declare type BondShapeDepth4<A extends AtomName> =
	A extends 'superuser' ? {groups?: Molecule<'group', 3>[]} :
	A extends 'user' ? {groups?: Molecule<'group', 3>[]} :
	A extends 'group' ? Record<never, unknown> :
	A extends 'media' ? Record<never, unknown> :
	A extends 'error' ? {request?: Molecule<'request', 3>} :
	A extends 'request' ? Record<never, unknown> :
	A extends 'setting' ? Record<never, unknown> :
	never

declare type Superuser = AtomHardProperties & SuperuserShape

declare type User = AtomHardProperties & UserShape

declare type Group = AtomHardProperties & GroupShape

declare type Media = AtomHardProperties & MediaShape

declare type Error = AtomHardProperties & ErrorShape

declare type Request = AtomHardProperties & RequestShape

declare type Setting = AtomHardProperties & SettingShape

export declare type AtomShape<A extends AtomName> =
	A extends 'superuser' ? SuperuserShape :
	A extends 'user' ? UserShape :
	A extends 'group' ? GroupShape :
	A extends 'media' ? MediaShape :
	A extends 'error' ? ErrorShape :
	A extends 'request' ? RequestShape :
	A extends 'setting' ? SettingShape :
	never

export declare type Atom<A extends AtomName> =
	A extends 'superuser' ? Superuser :
	A extends 'user' ? User :
	A extends 'group' ? Group :
	A extends 'media' ? Media :
	A extends 'error' ? Error :
	A extends 'request' ? Request :
	A extends 'setting' ? Setting :
	never


declare type RouteDefaultName = 'count' | 'find_one' | 'find' | 'find_id' | 'insert' | 'update' | 'delete' | 'insert_multiple' | 'update_multiple' | 'delete_multiple'

declare type RouteCustomName<A extends AtomName> =
	A extends 'superuser' ? never :
	A extends 'user' ? never :
	A extends 'group' ? never :
	A extends 'media' ? 'upload' | 'presigned' :
	A extends 'error' ? never :
	A extends 'request' ? never :
	A extends 'setting' ? never :
	never

export declare type RouteName<A extends AtomName> =
	RouteCustomName<A> | RouteDefaultName;

export declare type RouteURL<A extends AtomName, R extends RouteName<A>> =
	A extends 'superuser' ?
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
		never :
	A extends 'user' ?
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
		never :
	A extends 'group' ?
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
		never :
	A extends 'media' ?
		R extends 'upload' ? '/upload' :
		R extends 'presigned' ? '/presigned' :
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
		never :
	A extends 'error' ?
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
		never :
	A extends 'request' ?
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
		never :
	A extends 'setting' ?
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
		never :
never


export declare type RouteQueryParam<A extends AtomName, R extends RouteName<A>> =
	A extends 'superuser' ?
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
		never :
	A extends 'user' ?
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
		never :
	A extends 'group' ?
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
		never :
	A extends 'media' ?
		R extends 'upload' ? never :
		R extends 'presigned' ? 'filename' | 'size' | 'type' :
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
		never :
	A extends 'error' ?
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
		never :
	A extends 'request' ?
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
		never :
	A extends 'setting' ?
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
		never :
never



import {urn_response} from 'urn-lib';

export declare type CallResponse<A extends AtomName, R extends RouteName<A>, D extends Depth = 0> =
	A extends 'superuser' ?
		R extends 'count' ? number :
		R extends 'find_one' ? Molecule<A,D> :
		R extends 'find' ? Molecule<A,D>[] :
		R extends 'find_id' ? Molecule<A,D> :
		R extends 'insert' ? Molecule<A,D> :
		R extends 'update' ? Molecule<A,D> :
		R extends 'delete' ? Molecule<A,D> :
		R extends 'insert_multiple' ? Molecule<A,D>[] :
		R extends 'update_multiple' ? Molecule<A,D>[] :
		R extends 'delete_multiple' ? Molecule<A,D>[] :
		never :
	A extends 'user' ?
		R extends 'count' ? number :
		R extends 'find_one' ? Molecule<A,D> :
		R extends 'find' ? Molecule<A,D>[] :
		R extends 'find_id' ? Molecule<A,D> :
		R extends 'insert' ? Molecule<A,D> :
		R extends 'update' ? Molecule<A,D> :
		R extends 'delete' ? Molecule<A,D> :
		R extends 'insert_multiple' ? Molecule<A,D>[] :
		R extends 'update_multiple' ? Molecule<A,D>[] :
		R extends 'delete_multiple' ? Molecule<A,D>[] :
		never :
	A extends 'group' ?
		R extends 'count' ? number :
		R extends 'find_one' ? Molecule<A,D> :
		R extends 'find' ? Molecule<A,D>[] :
		R extends 'find_id' ? Molecule<A,D> :
		R extends 'insert' ? Molecule<A,D> :
		R extends 'update' ? Molecule<A,D> :
		R extends 'delete' ? Molecule<A,D> :
		R extends 'insert_multiple' ? Molecule<A,D>[] :
		R extends 'update_multiple' ? Molecule<A,D>[] :
		R extends 'delete_multiple' ? Molecule<A,D>[] :
		never :
	A extends 'media' ?
		R extends 'upload' ? Molecule<A,D>[] :
		R extends 'presigned' ? string :
		R extends 'count' ? number :
		R extends 'find_one' ? Molecule<A,D> :
		R extends 'find' ? Molecule<A,D>[] :
		R extends 'find_id' ? Molecule<A,D> :
		R extends 'insert' ? Molecule<A,D> :
		R extends 'update' ? Molecule<A,D> :
		R extends 'delete' ? Molecule<A,D> :
		R extends 'insert_multiple' ? Molecule<A,D>[] :
		R extends 'update_multiple' ? Molecule<A,D>[] :
		R extends 'delete_multiple' ? Molecule<A,D>[] :
		never :
	A extends 'error' ?
		R extends 'count' ? number :
		R extends 'find_one' ? Molecule<A,D> :
		R extends 'find' ? Molecule<A,D>[] :
		R extends 'find_id' ? Molecule<A,D> :
		R extends 'insert' ? Molecule<A,D> :
		R extends 'update' ? Molecule<A,D> :
		R extends 'delete' ? Molecule<A,D> :
		R extends 'insert_multiple' ? Molecule<A,D>[] :
		R extends 'update_multiple' ? Molecule<A,D>[] :
		R extends 'delete_multiple' ? Molecule<A,D>[] :
		never :
	A extends 'request' ?
		R extends 'count' ? number :
		R extends 'find_one' ? Molecule<A,D> :
		R extends 'find' ? Molecule<A,D>[] :
		R extends 'find_id' ? Molecule<A,D> :
		R extends 'insert' ? Molecule<A,D> :
		R extends 'update' ? Molecule<A,D> :
		R extends 'delete' ? Molecule<A,D> :
		R extends 'insert_multiple' ? Molecule<A,D>[] :
		R extends 'update_multiple' ? Molecule<A,D>[] :
		R extends 'delete_multiple' ? Molecule<A,D>[] :
		never :
	A extends 'setting' ?
		R extends 'count' ? number :
		R extends 'find_one' ? Molecule<A,D> :
		R extends 'find' ? Molecule<A,D>[] :
		R extends 'find_id' ? Molecule<A,D> :
		R extends 'insert' ? Molecule<A,D> :
		R extends 'update' ? Molecule<A,D> :
		R extends 'delete' ? Molecule<A,D> :
		R extends 'insert_multiple' ? Molecule<A,D>[] :
		R extends 'update_multiple' ? Molecule<A,D>[] :
		R extends 'delete_multiple' ? Molecule<A,D>[] :
		never :
	never


export declare type ApiResponse<A extends AtomName, R extends RouteName<A>, D extends Depth = 0> = urn_response.General<CallResponse<A,R,D>>

export {};/** --uranio-generate-end */

