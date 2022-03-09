/**
 * Auto generate hooks file
 *
 * @packageDocumentation
 */

import {urn_response} from 'urn-lib';

import {schema} from '../sch/client';
import * as types from '../client/types';
import * as auth from '../auth/client';
import * as base from '../base/client';
import * as media from '../media/client';
import {Hooks} from './types';

let hook_token:string|undefined;

export const hooks:Hooks = {
	set_token: (token:string):void => {
		hook_token = token;
	},
	get_token: ():string|undefined => {
		return hook_token;
	},
	superusers: {
		authenticate: async (
			email: string,
			password: string
		): Promise<urn_response.General<types.Api.AuthResponse>> => {
			return await auth.create('superuser').authenticate(email, password);
		},
		count: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'superuser', 'count', D>,
			token?:string
		):types.Hook.Response<'superuser', 'count', D>  => {
			const args:types.Hook.Arguments<'superuser', 'count', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('superuser',current_token).hook<'count',D>('count')(args);
		},
		find_one: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'superuser', 'find_one', D>,
			token?:string
		):types.Hook.Response<'superuser', 'find_one', D>  => {
			const args:types.Hook.Arguments<'superuser', 'find_one', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('superuser',current_token).hook<'find_one',D>('find_one')(args);
		},
		find: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'superuser', 'find', D>,
			token?:string
		):types.Hook.Response<'superuser', 'find', D>  => {
			const args:types.Hook.Arguments<'superuser', 'find', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('superuser',current_token).hook<'find',D>('find')(args);
		},
		find_id: async <D extends schema.Depth>(
			id:string,
			parameters?:types.Hook.Arguments<'superuser', 'find_id', D>,
			token?:string
		):types.Hook.Response<'superuser', 'find_id', D>  => {
			const args:types.Hook.Arguments<'superuser', 'find_id', D> = {
				params: {
					id: id,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('superuser',current_token).hook<'find_id',D>('find_id')(args);
		},
		insert: async <D extends schema.Depth>(
			body:types.Hook.Body<'superuser', 'insert'>,
			parameters?:types.Hook.Arguments<'superuser', 'insert', D>,
			token?:string
		):types.Hook.Response<'superuser', 'insert', D>  => {
			const args:types.Hook.Arguments<'superuser', 'insert', D> = {
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('superuser',current_token).hook<'insert',D>('insert')(args);
		},
		update: async <D extends schema.Depth>(
			id:string,
			body:types.Hook.Body<'superuser', 'update'>,
			parameters?:types.Hook.Arguments<'superuser', 'update', D>,
			token?:string
		):types.Hook.Response<'superuser', 'update', D>  => {
			const args:types.Hook.Arguments<'superuser', 'update', D> = {
				params: {
					id: id,
				},
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('superuser',current_token).hook<'update',D>('update')(args);
		},
		delete: async <D extends schema.Depth>(
			id:string,
			parameters?:types.Hook.Arguments<'superuser', 'delete', D>,
			token?:string
		):types.Hook.Response<'superuser', 'delete', D>  => {
			const args:types.Hook.Arguments<'superuser', 'delete', D> = {
				params: {
					id: id,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('superuser',current_token).hook<'delete',D>('delete')(args);
		},
		insert_multiple: async <D extends schema.Depth>(
			body:types.Hook.Body<'superuser', 'insert_multiple'>,
			parameters?:types.Hook.Arguments<'superuser', 'insert_multiple', D>,
			token?:string
		):types.Hook.Response<'superuser', 'insert_multiple', D>  => {
			const args:types.Hook.Arguments<'superuser', 'insert_multiple', D> = {
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('superuser',current_token).hook<'insert_multiple',D>('insert_multiple')(args);
		},
		update_multiple: async <D extends schema.Depth>(
			ids:string,
			body:types.Hook.Body<'superuser', 'update_multiple'>,
			parameters?:types.Hook.Arguments<'superuser', 'update_multiple', D>,
			token?:string
		):types.Hook.Response<'superuser', 'update_multiple', D>  => {
			const args:types.Hook.Arguments<'superuser', 'update_multiple', D> = {
				params: {
					ids: ids,
				},
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('superuser',current_token).hook<'update_multiple',D>('update_multiple')(args);
		},
		delete_multiple: async <D extends schema.Depth>(
			ids:string,
			parameters?:types.Hook.Arguments<'superuser', 'delete_multiple', D>,
			token?:string
		):types.Hook.Response<'superuser', 'delete_multiple', D>  => {
			const args:types.Hook.Arguments<'superuser', 'delete_multiple', D> = {
				params: {
					ids: ids,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('superuser',current_token).hook<'delete_multiple',D>('delete_multiple')(args);
		},
	},
	users: {
		authenticate: async (
			email: string,
			password: string
		): Promise<urn_response.General<types.Api.AuthResponse>> => {
			return await auth.create('user').authenticate(email, password);
		},
		count: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'user', 'count', D>,
			token?:string
		):types.Hook.Response<'user', 'count', D>  => {
			const args:types.Hook.Arguments<'user', 'count', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('user',current_token).hook<'count',D>('count')(args);
		},
		find_one: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'user', 'find_one', D>,
			token?:string
		):types.Hook.Response<'user', 'find_one', D>  => {
			const args:types.Hook.Arguments<'user', 'find_one', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('user',current_token).hook<'find_one',D>('find_one')(args);
		},
		find: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'user', 'find', D>,
			token?:string
		):types.Hook.Response<'user', 'find', D>  => {
			const args:types.Hook.Arguments<'user', 'find', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('user',current_token).hook<'find',D>('find')(args);
		},
		find_id: async <D extends schema.Depth>(
			id:string,
			parameters?:types.Hook.Arguments<'user', 'find_id', D>,
			token?:string
		):types.Hook.Response<'user', 'find_id', D>  => {
			const args:types.Hook.Arguments<'user', 'find_id', D> = {
				params: {
					id: id,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('user',current_token).hook<'find_id',D>('find_id')(args);
		},
		insert: async <D extends schema.Depth>(
			body:types.Hook.Body<'user', 'insert'>,
			parameters?:types.Hook.Arguments<'user', 'insert', D>,
			token?:string
		):types.Hook.Response<'user', 'insert', D>  => {
			const args:types.Hook.Arguments<'user', 'insert', D> = {
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('user',current_token).hook<'insert',D>('insert')(args);
		},
		update: async <D extends schema.Depth>(
			id:string,
			body:types.Hook.Body<'user', 'update'>,
			parameters?:types.Hook.Arguments<'user', 'update', D>,
			token?:string
		):types.Hook.Response<'user', 'update', D>  => {
			const args:types.Hook.Arguments<'user', 'update', D> = {
				params: {
					id: id,
				},
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('user',current_token).hook<'update',D>('update')(args);
		},
		delete: async <D extends schema.Depth>(
			id:string,
			parameters?:types.Hook.Arguments<'user', 'delete', D>,
			token?:string
		):types.Hook.Response<'user', 'delete', D>  => {
			const args:types.Hook.Arguments<'user', 'delete', D> = {
				params: {
					id: id,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('user',current_token).hook<'delete',D>('delete')(args);
		},
		insert_multiple: async <D extends schema.Depth>(
			body:types.Hook.Body<'user', 'insert_multiple'>,
			parameters?:types.Hook.Arguments<'user', 'insert_multiple', D>,
			token?:string
		):types.Hook.Response<'user', 'insert_multiple', D>  => {
			const args:types.Hook.Arguments<'user', 'insert_multiple', D> = {
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('user',current_token).hook<'insert_multiple',D>('insert_multiple')(args);
		},
		update_multiple: async <D extends schema.Depth>(
			ids:string,
			body:types.Hook.Body<'user', 'update_multiple'>,
			parameters?:types.Hook.Arguments<'user', 'update_multiple', D>,
			token?:string
		):types.Hook.Response<'user', 'update_multiple', D>  => {
			const args:types.Hook.Arguments<'user', 'update_multiple', D> = {
				params: {
					ids: ids,
				},
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('user',current_token).hook<'update_multiple',D>('update_multiple')(args);
		},
		delete_multiple: async <D extends schema.Depth>(
			ids:string,
			parameters?:types.Hook.Arguments<'user', 'delete_multiple', D>,
			token?:string
		):types.Hook.Response<'user', 'delete_multiple', D>  => {
			const args:types.Hook.Arguments<'user', 'delete_multiple', D> = {
				params: {
					ids: ids,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('user',current_token).hook<'delete_multiple',D>('delete_multiple')(args);
		},
	},
	groups: {
		count: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'group', 'count', D>,
			token?:string
		):types.Hook.Response<'group', 'count', D>  => {
			const args:types.Hook.Arguments<'group', 'count', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('group',current_token).hook<'count',D>('count')(args);
		},
		find_one: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'group', 'find_one', D>,
			token?:string
		):types.Hook.Response<'group', 'find_one', D>  => {
			const args:types.Hook.Arguments<'group', 'find_one', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('group',current_token).hook<'find_one',D>('find_one')(args);
		},
		find: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'group', 'find', D>,
			token?:string
		):types.Hook.Response<'group', 'find', D>  => {
			const args:types.Hook.Arguments<'group', 'find', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('group',current_token).hook<'find',D>('find')(args);
		},
		find_id: async <D extends schema.Depth>(
			id:string,
			parameters?:types.Hook.Arguments<'group', 'find_id', D>,
			token?:string
		):types.Hook.Response<'group', 'find_id', D>  => {
			const args:types.Hook.Arguments<'group', 'find_id', D> = {
				params: {
					id: id,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('group',current_token).hook<'find_id',D>('find_id')(args);
		},
		insert: async <D extends schema.Depth>(
			body:types.Hook.Body<'group', 'insert'>,
			parameters?:types.Hook.Arguments<'group', 'insert', D>,
			token?:string
		):types.Hook.Response<'group', 'insert', D>  => {
			const args:types.Hook.Arguments<'group', 'insert', D> = {
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('group',current_token).hook<'insert',D>('insert')(args);
		},
		update: async <D extends schema.Depth>(
			id:string,
			body:types.Hook.Body<'group', 'update'>,
			parameters?:types.Hook.Arguments<'group', 'update', D>,
			token?:string
		):types.Hook.Response<'group', 'update', D>  => {
			const args:types.Hook.Arguments<'group', 'update', D> = {
				params: {
					id: id,
				},
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('group',current_token).hook<'update',D>('update')(args);
		},
		delete: async <D extends schema.Depth>(
			id:string,
			parameters?:types.Hook.Arguments<'group', 'delete', D>,
			token?:string
		):types.Hook.Response<'group', 'delete', D>  => {
			const args:types.Hook.Arguments<'group', 'delete', D> = {
				params: {
					id: id,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('group',current_token).hook<'delete',D>('delete')(args);
		},
		insert_multiple: async <D extends schema.Depth>(
			body:types.Hook.Body<'group', 'insert_multiple'>,
			parameters?:types.Hook.Arguments<'group', 'insert_multiple', D>,
			token?:string
		):types.Hook.Response<'group', 'insert_multiple', D>  => {
			const args:types.Hook.Arguments<'group', 'insert_multiple', D> = {
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('group',current_token).hook<'insert_multiple',D>('insert_multiple')(args);
		},
		update_multiple: async <D extends schema.Depth>(
			ids:string,
			body:types.Hook.Body<'group', 'update_multiple'>,
			parameters?:types.Hook.Arguments<'group', 'update_multiple', D>,
			token?:string
		):types.Hook.Response<'group', 'update_multiple', D>  => {
			const args:types.Hook.Arguments<'group', 'update_multiple', D> = {
				params: {
					ids: ids,
				},
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('group',current_token).hook<'update_multiple',D>('update_multiple')(args);
		},
		delete_multiple: async <D extends schema.Depth>(
			ids:string,
			parameters?:types.Hook.Arguments<'group', 'delete_multiple', D>,
			token?:string
		):types.Hook.Response<'group', 'delete_multiple', D>  => {
			const args:types.Hook.Arguments<'group', 'delete_multiple', D> = {
				params: {
					ids: ids,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('group',current_token).hook<'delete_multiple',D>('delete_multiple')(args);
		},
	},
	media: {
		upload: async<D extends schema.Depth>(
			file: Buffer | ArrayBuffer | Blob,
			token?: string
		): Promise<urn_response.General<schema.Atom<'media'>>> => {
			let current_token: string | undefined;
			const hook_token = hooks.get_token();
			if (typeof hook_token === "string" && hook_token !== "") {
				current_token = hook_token;
			}
			if (typeof token === "string" && token !== "") {
				current_token = token;
			}
			return await media.create(current_token).upload<D>(file, current_token);
		},
		presigned: async(
			filename: string,
			size?: number,
			type?: string,
			token?: string
		): Promise<urn_response.General<string>> => {
			let current_token: string | undefined;
			const hook_token = hooks.get_token();
			if (typeof hook_token === "string" && hook_token !== "") {
				current_token = hook_token;
			}
			if (typeof token === "string" && token !== "") {
				current_token = token;
			}
			return await media.create(current_token).presigned(filename, size, type, current_token);
		},
		count: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'media', 'count', D>,
			token?:string
		):types.Hook.Response<'media', 'count', D>  => {
			const args:types.Hook.Arguments<'media', 'count', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('media',current_token).hook<'count',D>('count')(args);
		},
		find_one: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'media', 'find_one', D>,
			token?:string
		):types.Hook.Response<'media', 'find_one', D>  => {
			const args:types.Hook.Arguments<'media', 'find_one', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('media',current_token).hook<'find_one',D>('find_one')(args);
		},
		find: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'media', 'find', D>,
			token?:string
		):types.Hook.Response<'media', 'find', D>  => {
			const args:types.Hook.Arguments<'media', 'find', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('media',current_token).hook<'find',D>('find')(args);
		},
		find_id: async <D extends schema.Depth>(
			id:string,
			parameters?:types.Hook.Arguments<'media', 'find_id', D>,
			token?:string
		):types.Hook.Response<'media', 'find_id', D>  => {
			const args:types.Hook.Arguments<'media', 'find_id', D> = {
				params: {
					id: id,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('media',current_token).hook<'find_id',D>('find_id')(args);
		},
		insert: async <D extends schema.Depth>(
			body:types.Hook.Body<'media', 'insert'>,
			parameters?:types.Hook.Arguments<'media', 'insert', D>,
			token?:string
		):types.Hook.Response<'media', 'insert', D>  => {
			const args:types.Hook.Arguments<'media', 'insert', D> = {
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('media',current_token).hook<'insert',D>('insert')(args);
		},
		update: async <D extends schema.Depth>(
			id:string,
			body:types.Hook.Body<'media', 'update'>,
			parameters?:types.Hook.Arguments<'media', 'update', D>,
			token?:string
		):types.Hook.Response<'media', 'update', D>  => {
			const args:types.Hook.Arguments<'media', 'update', D> = {
				params: {
					id: id,
				},
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('media',current_token).hook<'update',D>('update')(args);
		},
		delete: async <D extends schema.Depth>(
			id:string,
			parameters?:types.Hook.Arguments<'media', 'delete', D>,
			token?:string
		):types.Hook.Response<'media', 'delete', D>  => {
			const args:types.Hook.Arguments<'media', 'delete', D> = {
				params: {
					id: id,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('media',current_token).hook<'delete',D>('delete')(args);
		},
		insert_multiple: async <D extends schema.Depth>(
			body:types.Hook.Body<'media', 'insert_multiple'>,
			parameters?:types.Hook.Arguments<'media', 'insert_multiple', D>,
			token?:string
		):types.Hook.Response<'media', 'insert_multiple', D>  => {
			const args:types.Hook.Arguments<'media', 'insert_multiple', D> = {
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('media',current_token).hook<'insert_multiple',D>('insert_multiple')(args);
		},
		update_multiple: async <D extends schema.Depth>(
			ids:string,
			body:types.Hook.Body<'media', 'update_multiple'>,
			parameters?:types.Hook.Arguments<'media', 'update_multiple', D>,
			token?:string
		):types.Hook.Response<'media', 'update_multiple', D>  => {
			const args:types.Hook.Arguments<'media', 'update_multiple', D> = {
				params: {
					ids: ids,
				},
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('media',current_token).hook<'update_multiple',D>('update_multiple')(args);
		},
		delete_multiple: async <D extends schema.Depth>(
			ids:string,
			parameters?:types.Hook.Arguments<'media', 'delete_multiple', D>,
			token?:string
		):types.Hook.Response<'media', 'delete_multiple', D>  => {
			const args:types.Hook.Arguments<'media', 'delete_multiple', D> = {
				params: {
					ids: ids,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('media',current_token).hook<'delete_multiple',D>('delete_multiple')(args);
		},
	},
	errors: {
		count: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'error', 'count', D>,
			token?:string
		):types.Hook.Response<'error', 'count', D>  => {
			const args:types.Hook.Arguments<'error', 'count', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('error',current_token).hook<'count',D>('count')(args);
		},
		find_one: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'error', 'find_one', D>,
			token?:string
		):types.Hook.Response<'error', 'find_one', D>  => {
			const args:types.Hook.Arguments<'error', 'find_one', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('error',current_token).hook<'find_one',D>('find_one')(args);
		},
		find: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'error', 'find', D>,
			token?:string
		):types.Hook.Response<'error', 'find', D>  => {
			const args:types.Hook.Arguments<'error', 'find', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('error',current_token).hook<'find',D>('find')(args);
		},
		find_id: async <D extends schema.Depth>(
			id:string,
			parameters?:types.Hook.Arguments<'error', 'find_id', D>,
			token?:string
		):types.Hook.Response<'error', 'find_id', D>  => {
			const args:types.Hook.Arguments<'error', 'find_id', D> = {
				params: {
					id: id,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('error',current_token).hook<'find_id',D>('find_id')(args);
		},
		insert: async <D extends schema.Depth>(
			body:types.Hook.Body<'error', 'insert'>,
			parameters?:types.Hook.Arguments<'error', 'insert', D>,
			token?:string
		):types.Hook.Response<'error', 'insert', D>  => {
			const args:types.Hook.Arguments<'error', 'insert', D> = {
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('error',current_token).hook<'insert',D>('insert')(args);
		},
		update: async <D extends schema.Depth>(
			id:string,
			body:types.Hook.Body<'error', 'update'>,
			parameters?:types.Hook.Arguments<'error', 'update', D>,
			token?:string
		):types.Hook.Response<'error', 'update', D>  => {
			const args:types.Hook.Arguments<'error', 'update', D> = {
				params: {
					id: id,
				},
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('error',current_token).hook<'update',D>('update')(args);
		},
		delete: async <D extends schema.Depth>(
			id:string,
			parameters?:types.Hook.Arguments<'error', 'delete', D>,
			token?:string
		):types.Hook.Response<'error', 'delete', D>  => {
			const args:types.Hook.Arguments<'error', 'delete', D> = {
				params: {
					id: id,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('error',current_token).hook<'delete',D>('delete')(args);
		},
		insert_multiple: async <D extends schema.Depth>(
			body:types.Hook.Body<'error', 'insert_multiple'>,
			parameters?:types.Hook.Arguments<'error', 'insert_multiple', D>,
			token?:string
		):types.Hook.Response<'error', 'insert_multiple', D>  => {
			const args:types.Hook.Arguments<'error', 'insert_multiple', D> = {
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('error',current_token).hook<'insert_multiple',D>('insert_multiple')(args);
		},
		update_multiple: async <D extends schema.Depth>(
			ids:string,
			body:types.Hook.Body<'error', 'update_multiple'>,
			parameters?:types.Hook.Arguments<'error', 'update_multiple', D>,
			token?:string
		):types.Hook.Response<'error', 'update_multiple', D>  => {
			const args:types.Hook.Arguments<'error', 'update_multiple', D> = {
				params: {
					ids: ids,
				},
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('error',current_token).hook<'update_multiple',D>('update_multiple')(args);
		},
		delete_multiple: async <D extends schema.Depth>(
			ids:string,
			parameters?:types.Hook.Arguments<'error', 'delete_multiple', D>,
			token?:string
		):types.Hook.Response<'error', 'delete_multiple', D>  => {
			const args:types.Hook.Arguments<'error', 'delete_multiple', D> = {
				params: {
					ids: ids,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('error',current_token).hook<'delete_multiple',D>('delete_multiple')(args);
		},
	},
	requests: {
		count: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'request', 'count', D>,
			token?:string
		):types.Hook.Response<'request', 'count', D>  => {
			const args:types.Hook.Arguments<'request', 'count', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('request',current_token).hook<'count',D>('count')(args);
		},
		find_one: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'request', 'find_one', D>,
			token?:string
		):types.Hook.Response<'request', 'find_one', D>  => {
			const args:types.Hook.Arguments<'request', 'find_one', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('request',current_token).hook<'find_one',D>('find_one')(args);
		},
		find: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'request', 'find', D>,
			token?:string
		):types.Hook.Response<'request', 'find', D>  => {
			const args:types.Hook.Arguments<'request', 'find', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('request',current_token).hook<'find',D>('find')(args);
		},
		find_id: async <D extends schema.Depth>(
			id:string,
			parameters?:types.Hook.Arguments<'request', 'find_id', D>,
			token?:string
		):types.Hook.Response<'request', 'find_id', D>  => {
			const args:types.Hook.Arguments<'request', 'find_id', D> = {
				params: {
					id: id,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('request',current_token).hook<'find_id',D>('find_id')(args);
		},
		insert: async <D extends schema.Depth>(
			body:types.Hook.Body<'request', 'insert'>,
			parameters?:types.Hook.Arguments<'request', 'insert', D>,
			token?:string
		):types.Hook.Response<'request', 'insert', D>  => {
			const args:types.Hook.Arguments<'request', 'insert', D> = {
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('request',current_token).hook<'insert',D>('insert')(args);
		},
		update: async <D extends schema.Depth>(
			id:string,
			body:types.Hook.Body<'request', 'update'>,
			parameters?:types.Hook.Arguments<'request', 'update', D>,
			token?:string
		):types.Hook.Response<'request', 'update', D>  => {
			const args:types.Hook.Arguments<'request', 'update', D> = {
				params: {
					id: id,
				},
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('request',current_token).hook<'update',D>('update')(args);
		},
		delete: async <D extends schema.Depth>(
			id:string,
			parameters?:types.Hook.Arguments<'request', 'delete', D>,
			token?:string
		):types.Hook.Response<'request', 'delete', D>  => {
			const args:types.Hook.Arguments<'request', 'delete', D> = {
				params: {
					id: id,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('request',current_token).hook<'delete',D>('delete')(args);
		},
		insert_multiple: async <D extends schema.Depth>(
			body:types.Hook.Body<'request', 'insert_multiple'>,
			parameters?:types.Hook.Arguments<'request', 'insert_multiple', D>,
			token?:string
		):types.Hook.Response<'request', 'insert_multiple', D>  => {
			const args:types.Hook.Arguments<'request', 'insert_multiple', D> = {
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('request',current_token).hook<'insert_multiple',D>('insert_multiple')(args);
		},
		update_multiple: async <D extends schema.Depth>(
			ids:string,
			body:types.Hook.Body<'request', 'update_multiple'>,
			parameters?:types.Hook.Arguments<'request', 'update_multiple', D>,
			token?:string
		):types.Hook.Response<'request', 'update_multiple', D>  => {
			const args:types.Hook.Arguments<'request', 'update_multiple', D> = {
				params: {
					ids: ids,
				},
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('request',current_token).hook<'update_multiple',D>('update_multiple')(args);
		},
		delete_multiple: async <D extends schema.Depth>(
			ids:string,
			parameters?:types.Hook.Arguments<'request', 'delete_multiple', D>,
			token?:string
		):types.Hook.Response<'request', 'delete_multiple', D>  => {
			const args:types.Hook.Arguments<'request', 'delete_multiple', D> = {
				params: {
					ids: ids,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('request',current_token).hook<'delete_multiple',D>('delete_multiple')(args);
		},
	},
	settings: {
		count: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'setting', 'count', D>,
			token?:string
		):types.Hook.Response<'setting', 'count', D>  => {
			const args:types.Hook.Arguments<'setting', 'count', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('setting',current_token).hook<'count',D>('count')(args);
		},
		find_one: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'setting', 'find_one', D>,
			token?:string
		):types.Hook.Response<'setting', 'find_one', D>  => {
			const args:types.Hook.Arguments<'setting', 'find_one', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('setting',current_token).hook<'find_one',D>('find_one')(args);
		},
		find: async <D extends schema.Depth>(
			parameters?:types.Hook.Arguments<'setting', 'find', D>,
			token?:string
		):types.Hook.Response<'setting', 'find', D>  => {
			const args:types.Hook.Arguments<'setting', 'find', D> = {
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('setting',current_token).hook<'find',D>('find')(args);
		},
		find_id: async <D extends schema.Depth>(
			id:string,
			parameters?:types.Hook.Arguments<'setting', 'find_id', D>,
			token?:string
		):types.Hook.Response<'setting', 'find_id', D>  => {
			const args:types.Hook.Arguments<'setting', 'find_id', D> = {
				params: {
					id: id,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('setting',current_token).hook<'find_id',D>('find_id')(args);
		},
		insert: async <D extends schema.Depth>(
			body:types.Hook.Body<'setting', 'insert'>,
			parameters?:types.Hook.Arguments<'setting', 'insert', D>,
			token?:string
		):types.Hook.Response<'setting', 'insert', D>  => {
			const args:types.Hook.Arguments<'setting', 'insert', D> = {
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('setting',current_token).hook<'insert',D>('insert')(args);
		},
		update: async <D extends schema.Depth>(
			id:string,
			body:types.Hook.Body<'setting', 'update'>,
			parameters?:types.Hook.Arguments<'setting', 'update', D>,
			token?:string
		):types.Hook.Response<'setting', 'update', D>  => {
			const args:types.Hook.Arguments<'setting', 'update', D> = {
				params: {
					id: id,
				},
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('setting',current_token).hook<'update',D>('update')(args);
		},
		delete: async <D extends schema.Depth>(
			id:string,
			parameters?:types.Hook.Arguments<'setting', 'delete', D>,
			token?:string
		):types.Hook.Response<'setting', 'delete', D>  => {
			const args:types.Hook.Arguments<'setting', 'delete', D> = {
				params: {
					id: id,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('setting',current_token).hook<'delete',D>('delete')(args);
		},
		insert_multiple: async <D extends schema.Depth>(
			body:types.Hook.Body<'setting', 'insert_multiple'>,
			parameters?:types.Hook.Arguments<'setting', 'insert_multiple', D>,
			token?:string
		):types.Hook.Response<'setting', 'insert_multiple', D>  => {
			const args:types.Hook.Arguments<'setting', 'insert_multiple', D> = {
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('setting',current_token).hook<'insert_multiple',D>('insert_multiple')(args);
		},
		update_multiple: async <D extends schema.Depth>(
			ids:string,
			body:types.Hook.Body<'setting', 'update_multiple'>,
			parameters?:types.Hook.Arguments<'setting', 'update_multiple', D>,
			token?:string
		):types.Hook.Response<'setting', 'update_multiple', D>  => {
			const args:types.Hook.Arguments<'setting', 'update_multiple', D> = {
				params: {
					ids: ids,
				},
				body: body,
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('setting',current_token).hook<'update_multiple',D>('update_multiple')(args);
		},
		delete_multiple: async <D extends schema.Depth>(
			ids:string,
			parameters?:types.Hook.Arguments<'setting', 'delete_multiple', D>,
			token?:string
		):types.Hook.Response<'setting', 'delete_multiple', D>  => {
			const args:types.Hook.Arguments<'setting', 'delete_multiple', D> = {
				params: {
					ids: ids,
				},
				...parameters
			};
			let current_token:string|undefined;
			const hook_token = hooks.get_token();
			if(typeof hook_token === 'string' && hook_token !== ''){
				current_token = hook_token;
			}
			if(typeof token === 'string' && token !== ''){
				current_token = token;
			}
			return await base.create('setting',current_token).hook<'delete_multiple',D>('delete_multiple')(args);
		},
	},
};

