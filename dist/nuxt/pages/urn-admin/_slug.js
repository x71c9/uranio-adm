"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_typed_mixins_1 = __importDefault(require("vue-typed-mixins"));
const client_1 = __importDefault(require("uranio/client"));
// import { urn_util, urn_response, urn_log, urn_exception, urn_return } from "urn-lib";
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
        add_atoms(atoms) {
            this.atoms.unshift(atoms);
            this.page.total_atom_count += 1;
        },
        async delete_all_atoms() {
            //
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
            const deleted_ids = urn_res.payload.map(a => a._from);
            let count = 0;
            for (const id of deleted_ids) {
                if (!id) {
                    continue;
                }
                count++;
                const index = this.atoms.map(a => a._id).indexOf(id);
                this.$delete(this.atoms, index);
            }
            this.page.total_atom_count -= count;
            (_a = this.$refs.allTable) === null || _a === void 0 ? void 0 : _a.check_none();
            const not_label = (ids.length > 1) ? this.plural : this.atom_name;
            this.$store.dispatch('notification/show_notification', {
                type: notification_1.Notification.ERROR,
                message: `${not_label} deleted.`,
            });
            if (this.atoms.length === 0) {
                this.reload_atoms();
            }
        },
        async reload_atoms() {
            var _a, _b;
            try {
                const query = {
                    page: Number(this.page.index) + 1,
                    limit: Number(this.page.query_limit),
                    sort: this.page.sort_by
                };
                const loaded_data = await _load_data(this.atom_name, query, 0);
                for (const atom of loaded_data.atoms) {
                    this.atoms.push(atom);
                }
                (_a = this.$refs.allTable) === null || _a === void 0 ? void 0 : _a.reset_check();
                (_b = this.$refs.allTable) === null || _b === void 0 ? void 0 : _b.reload_check();
                this.page.index = loaded_data.page.index;
                this.page.query_limit = loaded_data.page.query_limit;
                this.page.sort_by = loaded_data.page.sort_by;
                this.page.total_atom_count = loaded_data.page.total_atom_count;
                this.page.total_page_num = loaded_data.page.total_page_num;
            }
            catch (e) {
                const err = e;
                this.error_object = err;
                this.message = err.message || '[ERROR]';
            }
        }
    },
    async asyncData(context) {
        urn_lib_1.urn_log.debug('AsyncData.context.params', context.params);
        await context.store.dispatch('auth/authenticate');
        let success = false;
        const atom_name = context.params.slug;
        if (!client_1.default.book.validate_name(atom_name)) {
            urn_lib_1.urn_log.error(`Invalid context param slug.`);
            context.error({ statusCode: 404, message: "Page not found" });
        }
        let plural = atom_name + "s";
        let is_read_only = false;
        const atom_def = client_1.default.book.get_definition(atom_name);
        if (urn_lib_1.urn_util.object.has_key(atom_def, 'plural') && atom_def.plural) {
            plural = atom_def.plural;
        }
        if (urn_lib_1.urn_util.object.has_key(atom_def, 'read_only') && atom_def.read_only === true) {
            is_read_only = atom_def.read_only;
        }
        let message = '';
        let error_object = {};
        const query = {
            page: Number(context.query.page),
            limit: Number(context.query.limit),
            sort: context.query.sort
        };
        let atoms = [];
        let page = {
            index: 0,
            total_page_num: 0,
            total_atom_count: 0,
            query_limit: 0,
            sort_by: { _date: -1 }
        };
        try {
            const loaded_data = await _load_data(atom_name, query, 0);
            atoms = loaded_data.atoms;
            page = loaded_data.page;
            success = true;
        }
        catch (e) {
            const err = e;
            error_object = err;
            message = err.message || '[ERROR]';
            success = false;
        }
        return {
            page,
            atom_name,
            plural,
            atoms,
            message,
            success,
            error_object,
            is_read_only
        };
    },
});
async function _count_atoms(atom_name) {
    const trx_base = client_1.default.trx.base.create(atom_name);
    const trx_hook_count = trx_base.hook('count');
    const trx_res_count = await trx_hook_count({});
    if (!trx_res_count.success) {
        throw trx_res_count;
    }
    return trx_res_count.payload;
}
async function _find_atoms(atom_name, query_limit, sort_by, skip, depth) {
    const trx_base = client_1.default.trx.base.create(atom_name);
    const trx_hook_find = trx_base.hook('find');
    const find_params = {
        query: {
            options: {
                limit: query_limit,
                sort: sort_by,
                skip: skip,
                depth: depth
            }
        }
    };
    const trx_res_find = await trx_hook_find(find_params);
    if (!trx_res_find.success) {
        throw trx_res_find;
    }
    return trx_res_find.payload;
}
async function _load_data(atom_name, query, depth) {
    let index = 0;
    let query_limit = 10;
    let sort_by = { _date: -1 };
    if (query.page) {
        index = parseInt(query.page) - 1;
    }
    if (query.limit) {
        query_limit = parseInt(query.limit);
        if (query_limit < 0) {
            query_limit = 1;
        }
        else if (query_limit > 128) {
            query_limit = 128;
        }
    }
    if (query.sort) {
        sort_by = query.sort;
    }
    const total_atom_count = await _count_atoms(atom_name);
    let total_page_num = Math.floor(total_atom_count / query_limit);
    const reminder = total_atom_count % query_limit;
    if (reminder > 0) {
        total_page_num += 1;
    }
    if (total_page_num === 0) {
        total_page_num = 1;
    }
    const skip = index * query_limit;
    if (index < 0 || index > total_page_num - 1) {
        const ret = urn_lib_1.urn_return.create();
        throw ret.return_error(400, `Invalid index. Index greater than maximum.`, `INVALID_INDEX`, `Invalid index. Index greater than maximum.`);
    }
    const atoms = await _find_atoms(atom_name, query_limit, sort_by, skip, depth);
    const page = {
        total_page_num,
        total_atom_count,
        index,
        query_limit,
        sort_by
    };
    return {
        page,
        atoms
    };
}
//# sourceMappingURL=_slug.js.map