"use strict";
/**
 * Auto generate hooks file
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("uranio/client"));
client_1.default.hooks['superusers'] = {
    authenticate: async (email, password) => {
        return await client_1.default.auth.create('superuser').authenticate(email, password);
    },
    count: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('superuser', current_token).hook('count')(args);
    },
    find_one: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('superuser', current_token).hook('find_one')(args);
    },
    find: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('superuser', current_token).hook('find')(args);
    },
    find_id: async (id, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('superuser', current_token).hook('find_id')(args);
    },
    insert: async (body, parameters, token) => {
        const args = {
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('superuser', current_token).hook('insert')(args);
    },
    update: async (id, body, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('superuser', current_token).hook('update')(args);
    },
    delete: async (id, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('superuser', current_token).hook('delete')(args);
    },
    insert_multiple: async (body, parameters, token) => {
        const args = {
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('superuser', current_token).hook('insert_multiple')(args);
    },
    update_multiple: async (ids, body, parameters, token) => {
        const args = {
            params: {
                ids: ids,
            },
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('superuser', current_token).hook('update_multiple')(args);
    },
    delete_multiple: async (ids, parameters, token) => {
        const args = {
            params: {
                ids: ids,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('superuser', current_token).hook('delete_multiple')(args);
    },
};
client_1.default.hooks['users'] = {
    authenticate: async (email, password) => {
        return await client_1.default.auth.create('user').authenticate(email, password);
    },
    count: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('user', current_token).hook('count')(args);
    },
    find_one: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('user', current_token).hook('find_one')(args);
    },
    find: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('user', current_token).hook('find')(args);
    },
    find_id: async (id, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('user', current_token).hook('find_id')(args);
    },
    insert: async (body, parameters, token) => {
        const args = {
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('user', current_token).hook('insert')(args);
    },
    update: async (id, body, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('user', current_token).hook('update')(args);
    },
    delete: async (id, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('user', current_token).hook('delete')(args);
    },
    insert_multiple: async (body, parameters, token) => {
        const args = {
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('user', current_token).hook('insert_multiple')(args);
    },
    update_multiple: async (ids, body, parameters, token) => {
        const args = {
            params: {
                ids: ids,
            },
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('user', current_token).hook('update_multiple')(args);
    },
    delete_multiple: async (ids, parameters, token) => {
        const args = {
            params: {
                ids: ids,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('user', current_token).hook('delete_multiple')(args);
    },
};
client_1.default.hooks['groups'] = {
    count: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('group', current_token).hook('count')(args);
    },
    find_one: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('group', current_token).hook('find_one')(args);
    },
    find: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('group', current_token).hook('find')(args);
    },
    find_id: async (id, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('group', current_token).hook('find_id')(args);
    },
    insert: async (body, parameters, token) => {
        const args = {
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('group', current_token).hook('insert')(args);
    },
    update: async (id, body, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('group', current_token).hook('update')(args);
    },
    delete: async (id, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('group', current_token).hook('delete')(args);
    },
    insert_multiple: async (body, parameters, token) => {
        const args = {
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('group', current_token).hook('insert_multiple')(args);
    },
    update_multiple: async (ids, body, parameters, token) => {
        const args = {
            params: {
                ids: ids,
            },
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('group', current_token).hook('update_multiple')(args);
    },
    delete_multiple: async (ids, parameters, token) => {
        const args = {
            params: {
                ids: ids,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('group', current_token).hook('delete_multiple')(args);
    },
};
client_1.default.hooks['media'] = {
    upload: async (file, token) => {
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === "string" && hook_token !== "") {
            current_token = hook_token;
        }
        if (typeof token === "string" && token !== "") {
            current_token = token;
        }
        return await client_1.default.media.create(current_token).upload(file, current_token);
    },
    presigned: async (filename, size, type, token) => {
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === "string" && hook_token !== "") {
            current_token = hook_token;
        }
        if (typeof token === "string" && token !== "") {
            current_token = token;
        }
        return await client_1.default.media.create(current_token).presigned(filename, size, type, current_token);
    },
    count: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('media', current_token).hook('count')(args);
    },
    find_one: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('media', current_token).hook('find_one')(args);
    },
    find: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('media', current_token).hook('find')(args);
    },
    find_id: async (id, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('media', current_token).hook('find_id')(args);
    },
    insert: async (body, parameters, token) => {
        const args = {
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('media', current_token).hook('insert')(args);
    },
    update: async (id, body, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('media', current_token).hook('update')(args);
    },
    delete: async (id, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('media', current_token).hook('delete')(args);
    },
    insert_multiple: async (body, parameters, token) => {
        const args = {
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('media', current_token).hook('insert_multiple')(args);
    },
    update_multiple: async (ids, body, parameters, token) => {
        const args = {
            params: {
                ids: ids,
            },
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('media', current_token).hook('update_multiple')(args);
    },
    delete_multiple: async (ids, parameters, token) => {
        const args = {
            params: {
                ids: ids,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('media', current_token).hook('delete_multiple')(args);
    },
};
client_1.default.hooks['settings'] = {
    count: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('setting', current_token).hook('count')(args);
    },
    find_one: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('setting', current_token).hook('find_one')(args);
    },
    find: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('setting', current_token).hook('find')(args);
    },
    find_id: async (id, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('setting', current_token).hook('find_id')(args);
    },
    insert: async (body, parameters, token) => {
        const args = {
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('setting', current_token).hook('insert')(args);
    },
    update: async (id, body, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('setting', current_token).hook('update')(args);
    },
    delete: async (id, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('setting', current_token).hook('delete')(args);
    },
    insert_multiple: async (body, parameters, token) => {
        const args = {
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('setting', current_token).hook('insert_multiple')(args);
    },
    update_multiple: async (ids, body, parameters, token) => {
        const args = {
            params: {
                ids: ids,
            },
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('setting', current_token).hook('update_multiple')(args);
    },
    delete_multiple: async (ids, parameters, token) => {
        const args = {
            params: {
                ids: ids,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('setting', current_token).hook('delete_multiple')(args);
    },
};
client_1.default.hooks['errors'] = {
    count: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('error', current_token).hook('count')(args);
    },
    find_one: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('error', current_token).hook('find_one')(args);
    },
    find: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('error', current_token).hook('find')(args);
    },
    find_id: async (id, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('error', current_token).hook('find_id')(args);
    },
    insert: async (body, parameters, token) => {
        const args = {
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('error', current_token).hook('insert')(args);
    },
    update: async (id, body, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('error', current_token).hook('update')(args);
    },
    delete: async (id, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('error', current_token).hook('delete')(args);
    },
    insert_multiple: async (body, parameters, token) => {
        const args = {
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('error', current_token).hook('insert_multiple')(args);
    },
    update_multiple: async (ids, body, parameters, token) => {
        const args = {
            params: {
                ids: ids,
            },
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('error', current_token).hook('update_multiple')(args);
    },
    delete_multiple: async (ids, parameters, token) => {
        const args = {
            params: {
                ids: ids,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('error', current_token).hook('delete_multiple')(args);
    },
};
client_1.default.hooks['requests'] = {
    count: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('request', current_token).hook('count')(args);
    },
    find_one: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('request', current_token).hook('find_one')(args);
    },
    find: async (parameters, token) => {
        const args = {
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('request', current_token).hook('find')(args);
    },
    find_id: async (id, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('request', current_token).hook('find_id')(args);
    },
    insert: async (body, parameters, token) => {
        const args = {
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('request', current_token).hook('insert')(args);
    },
    update: async (id, body, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('request', current_token).hook('update')(args);
    },
    delete: async (id, parameters, token) => {
        const args = {
            params: {
                id: id,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('request', current_token).hook('delete')(args);
    },
    insert_multiple: async (body, parameters, token) => {
        const args = {
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('request', current_token).hook('insert_multiple')(args);
    },
    update_multiple: async (ids, body, parameters, token) => {
        const args = {
            params: {
                ids: ids,
            },
            body: body,
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('request', current_token).hook('update_multiple')(args);
    },
    delete_multiple: async (ids, parameters, token) => {
        const args = {
            params: {
                ids: ids,
            },
            ...parameters
        };
        let current_token;
        const hook_token = client_1.default.hooks.get_token();
        if (typeof hook_token === 'string' && hook_token !== '') {
            current_token = hook_token;
        }
        if (typeof token === 'string' && token !== '') {
            current_token = token;
        }
        return await client_1.default.base.create('request', current_token).hook('delete_multiple')(args);
    },
};
//# sourceMappingURL=hooks.js.map