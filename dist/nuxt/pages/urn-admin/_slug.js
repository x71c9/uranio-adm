"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_url = exports.get_url_query = exports.query_object = void 0;
const vue_typed_mixins_1 = __importDefault(require("vue-typed-mixins"));
const client_1 = __importDefault(require("uranio/client"));
const urn_lib_1 = require("urn-lib");
const shared_1 = __importDefault(require("./shared"));
const notification_1 = require("../../store/notification");
exports.default = (0, vue_typed_mixins_1.default)(shared_1.default).extend({
    layout() {
        return "urn-admin";
    },
    mixins: [
        shared_1.default
    ],
    provide() {
        return {
            atoms: this.atoms,
            atom_name: this.atom_name,
            plural: this.plural,
            page_query: this.page_query,
            page_data: this.page_data,
            total_atoms: this.total_atoms,
            is_read_only: this.is_read_only,
        };
    },
    key(route) {
        return route.fullPath;
    },
    // watchQuery: [
    //   'page',
    //   'limit',
    //   'sort'
    // ],
    watchQuery(_oldQuery, _newQuery) {
        return true;
    },
    methods: {
        fail() {
            //
        },
        add_atom(atoms) {
            this.atoms.unshift(atoms);
            this.total_atoms += 1;
        },
        async delete_all_atoms() {
            return await this.delete_atoms(['*']);
        },
        async delete_atoms(ids) {
            var _a;
            const trx_base = client_1.default.trx.base.create(this.atom_name);
            const args = {
                params: {
                    ids: ids.join(',')
                }
            };
            const urn_res = await trx_base.hook('delete_multiple')(args);
            if (!urn_res.success) {
                return this.fail();
            }
            const deleted_ids = urn_res.payload.map((a) => {
                return a._from;
            });
            let count = 0;
            for (const id of deleted_ids) {
                if (!id) {
                    continue;
                }
                count++;
                const index = this.atoms.map(a => a._id).indexOf(id);
                this.$delete(this.atoms, index);
            }
            this.total_atoms -= count;
            this.page_data.total_result -= count;
            (_a = this.$refs.allTable) === null || _a === void 0 ? void 0 : _a.check_none();
            const not_label = (ids.length > 1) ? this.plural : this.atom_name;
            this.$store.dispatch('notification/show_notification', {
                type: notification_1.Notification.ERROR,
                message: `${not_label} deleted.`,
            });
            if (this.atoms.length === 0) {
                this.get_atoms();
            }
        },
        async update_all_atoms(_atom_shape) {
            //
        },
        async update_atoms(_atom_shape) {
            //
        },
        async search_atoms(q) {
            this.page_query.q = q;
            this.page_query.index = 0;
            this.get_atoms();
        },
        async get_atoms() {
            _reset_checkbox(this.$refs.allTable);
            // _set_page_data_from_loaded_data(this.page, loaded_data.page);
            try {
                this.atoms.splice(0);
                const atoms = await _get_atoms(this.atom_name, this.page_query);
                for (const atom of atoms) {
                    this.atoms.push(atom);
                }
                this.page_data.total_result = await _count_atoms(this.atom_name, this.page_query);
                this.page_data.total_pages = _total_pages(this.page_data.total_result, this.page_query.limit);
                // if(this.page_query.index > this.page_data.total_pages - 1){
                // 	this.page_query.index = this.page_data.total_pages - 1;
                // 	this.$router.push({
                // 		name: 'urn-admin-slug',
                // 		params: {
                // 			slug: this.atom_name
                // 		},
                // 		query: query_object(this.page_query)
                // 	});
                // 	return;
                // }
                // this.$router.push({
                // 	name: 'urn-admin-slug',
                // 	params: {
                // 		slug: this.atom_name
                // 	},
                // 	query: query_object(this.page_query)
                // });
                // // This replace the URL without reloading the page.
                // // Vue.router replace will reload and lose focust for the search.
                history.replaceState({}, '', this.$route.path + `?${get_url_query(this.page_query)}`);
                this.success = true;
            }
            catch (e) {
                const err = e;
                this.error_object = err;
                this.message = err.message || '[ERROR]';
                this.success = false;
            }
        },
    },
    async asyncData(context) {
        urn_lib_1.urn_log.debug('AsyncData.context.params', context.params);
        let success = false;
        const atom_name = context.params.slug;
        if (!client_1.default.book.validate_name(atom_name)) {
            urn_lib_1.urn_log.error(`Invalid context param slug.`);
            context.error({ statusCode: 404, message: "Page not found" });
        }
        const plural = client_1.default.book.get_plural(atom_name);
        let is_read_only = false;
        let atoms = [];
        const atom_def = client_1.default.book.get_definition(atom_name);
        if (urn_lib_1.urn_util.object.has_key(atom_def, 'read_only') && atom_def.read_only === true) {
            is_read_only = atom_def.read_only;
        }
        const index = Math.abs(Number(context.query.page || 1)) - 1;
        let limit = 10;
        if (context.query.limit) {
            limit = Math.abs(Number(context.query.limit));
            if (limit > 128) {
                limit = 128;
            }
        }
        let sort = { _date: -1 };
        if (context.query.sort && _validate_sort(context.query.sort, atom_name)) {
            sort = context.query.sort;
        }
        let q = '';
        if (context.query.q) {
            q = String(context.query.q);
        }
        const page_query = {
            index: index,
            limit: limit,
            sort: sort,
            q: q
        };
        let message = '';
        let error_object = {};
        let total_atoms = 0;
        const page_data = {
            total_result: 0,
            total_pages: 1,
        };
        let empty_relation = false;
        try {
            total_atoms = await _count_all_atoms(atom_name);
            page_data.total_result = await _count_atoms(atom_name, page_query);
            atoms = await _get_atoms(atom_name, page_query);
            page_data.total_pages = _total_pages(page_data.total_result, page_query.limit);
            if (page_query.index > page_data.total_pages - 1) {
                page_query.index = page_data.total_pages - 1;
            }
            if (page_data.total_result === 0) {
                empty_relation = true;
            }
            success = true;
        }
        catch (e) {
            const err = e;
            error_object = err;
            message = err.message || '[ERROR]';
            success = false;
        }
        return {
            atom_name,
            atoms,
            is_read_only,
            total_atoms,
            plural,
            page_query,
            page_data,
            message,
            success,
            error_object,
            empty_relation
        };
    },
});
function _total_pages(total_result, limit) {
    return Math.floor(total_result / (limit || 1)) + ((total_result % limit === 0) ? 0 : 1);
}
async function _count_all_atoms(atom_name) {
    const trx_response = await _hook_find_count(atom_name, { index: 0, limit: 0, sort: {}, q: '' });
    if (!trx_response.success) {
        throw trx_response;
    }
    return trx_response.payload;
}
async function _count_atoms(atom_name, page_query) {
    let trx_response;
    if (page_query.q && page_query.q !== '') {
        trx_response = await _hook_search_count(atom_name, page_query);
    }
    else {
        trx_response = await _hook_find_count(atom_name, page_query);
    }
    if (!trx_response.success) {
        throw trx_response;
    }
    return trx_response.payload;
}
async function _get_atoms(atom_name, page_query) {
    let trx_response;
    if (page_query.q && page_query.q !== '') {
        trx_response = await _hook_search(atom_name, page_query);
    }
    else {
        trx_response = await _hook_find(atom_name, page_query);
    }
    if (!trx_response.success) {
        throw trx_response;
    }
    return trx_response.payload;
}
async function _hook_find(atom_name, page_query) {
    const trx_base = client_1.default.trx.base.create(atom_name);
    const trx_hook_find = trx_base.hook('find');
    const find_params = {
        query: _hook_query(page_query)
    };
    const trx_response = await trx_hook_find(find_params);
    return trx_response;
}
async function _hook_search(atom_name, page_query) {
    const trx_base = client_1.default.trx.base.create(atom_name);
    const trx_hook_search = trx_base.hook('search');
    const search_params = {
        params: {
            q: page_query.q
        },
        query: _hook_query(page_query)
    };
    const trx_response = await trx_hook_search(search_params);
    return trx_response;
}
async function _hook_find_count(atom_name, page_query) {
    const trx_base = client_1.default.trx.base.create(atom_name);
    const trx_hook_find = trx_base.hook('count');
    const find_params = {
        query: _hook_query_count(page_query)
    };
    const trx_response = await trx_hook_find(find_params);
    return trx_response;
}
async function _hook_search_count(atom_name, page_query) {
    const trx_base = client_1.default.trx.base.create(atom_name);
    const trx_hook_search = trx_base.hook('search_count');
    const search_params = {
        params: {
            q: page_query.q
        },
        query: _hook_query_count(page_query)
    };
    const trx_response = await trx_hook_search(search_params);
    return trx_response;
}
function _hook_query(page_query) {
    return {
        options: {
            limit: page_query.limit,
            sort: page_query.sort,
            skip: Math.abs(page_query.index * page_query.limit)
        }
    };
}
function _hook_query_count(_page_query) {
    return {
        options: {}
    };
}
function _validate_sort(sort, atom_name) {
    if (typeof sort !== 'object' || !sort || Array.isArray(sort)) {
        return false;
    }
    const atom_keys = client_1.default.core.atom.keys.get_all(atom_name);
    for (const [key, value] of Object.entries(sort)) {
        if (!atom_keys.has(key) && (Number(value) === 1 || Number(value) === -1)) {
            urn_lib_1.urn_log.warn(`Invalid sort paramter in query string.`);
            return false;
        }
    }
    return true;
}
function _reset_checkbox(allTable) {
    allTable === null || allTable === void 0 ? void 0 : allTable.reset_check();
    allTable === null || allTable === void 0 ? void 0 : allTable.reload_check();
}
/**
 * `query_obj` optional paramter will override `page_query` values
 */
function query_object(page_query, query_obj) {
    const result = {};
    if (page_query.index != 0) {
        result.page = (page_query.index + 1).toString();
    }
    if (page_query.limit) {
        result.limit = (page_query.limit).toString();
    }
    if (page_query.sort) {
        result.sort = (page_query.sort);
    }
    if (page_query.q !== '') {
        result.q = (page_query.q);
    }
    if (query_obj) {
        if (query_obj.page && query_obj.page != '0') {
            result.page = query_obj.page.toString();
        }
        if (query_obj.limit && query_obj.limit != '0') {
            result.limit = query_obj.limit.toString();
        }
        if (query_obj.sort) {
            result.sort = query_obj.sort;
        }
        if (query_obj.q && query_obj.q != '') {
            result.q = query_obj.q.toString();
        }
    }
    return result;
}
exports.query_object = query_object;
function _query_string(query_object) {
    const query_string = urn_lib_1.urn_util.url.encode_params(query_object);
    return query_string;
}
function get_url_query(page_query, query_obj) {
    const q_object = query_object(page_query, query_obj);
    const qs = _query_string(q_object);
    return qs;
}
exports.get_url_query = get_url_query;
function get_url(atom_name, page_query, query_obj) {
    const qs = get_url_query(page_query, query_obj);
    return `/urn-admin/${atom_name}?${qs}`;
}
exports.get_url = get_url;
//function unflatten(data:any) {
//	if (Object(data) !== data || Array.isArray(data))
//		return data;
//	// 
//	const regex = /\.?([^.\[\]]+)|\[(\d+)\]/g;
//	const resultholder = {};
//	for (const p in data) {
//		let cur = resultholder,
//			prop = "",
//			m;
//		while (m == regex.exec(p)) {
//			cur = (cur as any)[prop] || ((cur as any)[prop] = (m[2] ? [] : {}));
//			prop = m[2] || m[1];
//		}
//		(cur as any)[prop] = data[p];
//	}
//	return (resultholder as any)[""] || resultholder;
//}
//# sourceMappingURL=_slug.js.map