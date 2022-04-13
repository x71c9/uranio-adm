"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
            page: this.page,
            plural: this.plural,
            is_read_only: this.is_read_only,
            atoms: this.atoms,
            atom_name: this.atom_name
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
            this.total_result -= count;
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
        async get_atoms() {
            // This replace the URL without reloading the page.
            // Vue.router replace will reload and lose focust for the search.
            // history.replaceState({}, '', this.$route.path+`?${urn_util.url.encode_params(query)}`);
            _reset_checkbox(this.$refs.allTable);
            // _set_page_data_from_loaded_data(this.page, loaded_data.page);
            try {
                this.atoms.splice(0);
                this.atoms = await _get_atoms(this.atom_name, this.page_query);
                this.total_result = this.atoms.length;
                this.total_pages = _total_pages(this.total_result, this.page_query.limit);
                if (this.page_query.index > this.total_pages - 1) {
                    this.page_query.index = this.total_pages - 1;
                }
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
        if (context.query.sort && _validate_sort(context.query.sort)) {
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
        let total_result = 0;
        let total_pages = 1;
        try {
            total_atoms = await _count_atoms(atom_name);
            atoms = await _get_atoms(atom_name, page_query);
            total_result = total_atoms;
            total_pages = _total_pages(total_result, page_query.limit);
            if (page_query.index > total_pages - 1) {
                page_query.index = total_pages - 1;
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
            total_pages,
            total_result,
            message,
            success,
            error_object,
        };
    },
});
function _total_pages(total_result, limit) {
    return Math.floor(total_result / (limit || 1)) + ((total_result % limit === 0) ? 1 : 0);
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
            skip: page_query.index * page_query.limit
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
// function _set_page_data_from_loaded_data(this_page:Page, loaded_page:Page){
// 	this_page.index = loaded_page.index;
// 	this_page.query_limit = loaded_page.query_limit;
// 	this_page.sort_by = loaded_page.sort_by;
// 	this_page.search_query = loaded_page.search_query;
// 	this_page.total_atom_count = loaded_page.total_atom_count;
// 	this_page.total_result_count = loaded_page.total_result_count;
// 	this_page.total_page_num = loaded_page.total_page_num;
// }
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