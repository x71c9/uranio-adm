"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const urn_lib_1 = require("urn-lib");
const client_1 = __importDefault(require("uranio/client"));
const notification_1 = require("../../../store/notification");
exports.default = vue_1.default.extend({
    layout() {
        return "urn-admin";
    },
    provide() {
        return {
            atom: this.atom,
            atom_name: this.atom_name
        };
    },
    async asyncData(context) {
        var _a, _b;
        urn_lib_1.urn_log.debug('AsyncData.context.params: ', context.params);
        const atom_name = context.params.atom;
        // TODO Validate atom_name
        const atom_id = context.params.slug;
        const plural = atom_name + "s";
        let is_read_only = false;
        let back_label = `back to ${plural}`;
        let message = "";
        let success = false;
        let atom = {};
        let data_object = {};
        let title = '[NO TITLE]';
        let error_object = {};
        if (client_1.default.book.validate_name(atom_name)) {
            // const atom_def = atom_book[atom_name];
            // const atom_def_props = atom_def.properties as uranio.types.Book.Definition.Properties;
            const atom_def = client_1.default.book.get_definition(atom_name);
            const prop_defs = client_1.default.book.get_custom_properties_definition(atom_name);
            if (urn_lib_1.urn_util.object.has_key(atom_def, "plural")) {
                back_label = `back to ${atom_def.plural}`;
            }
            if (((_b = (_a = context === null || context === void 0 ? void 0 : context.from) === null || _a === void 0 ? void 0 : _a.params) === null || _b === void 0 ? void 0 : _b.slug) !== atom_name) {
                back_label = 'back';
            }
            if (urn_lib_1.urn_util.object.has_key(atom_def, 'read_only') && atom_def.read_only === true) {
                is_read_only = true;
            }
            // const trx_base = uranio.trx.base.create(atom_name, context.store.state.auth.token);
            const trx_base = client_1.default.trx.base.create(atom_name);
            const trx_hook = trx_base.hook('find_id');
            const hook_params = {
                params: {
                    id: atom_id
                }
            };
            const trx_response = await trx_hook(hook_params);
            data_object = JSON.parse(JSON.stringify({ ...trx_response }));
            urn_lib_1.urn_log.debug('[find_id] TRX Response: ', trx_response);
            success = trx_response.success;
            if (trx_response.success === true) {
                atom = trx_response.payload;
                title = atom._id;
                for (const [prop_name, prop_def] of Object.entries(prop_defs)) {
                    const prop_value = atom[prop_name];
                    if (prop_def.is_title === true
                        && typeof prop_value === 'string'
                        && prop_value !== '') {
                        title = prop_value;
                    }
                }
            }
            else {
                message = trx_response.err_msg || "ERROR";
                error_object = trx_response;
            }
        }
        else {
            context.error({ statusCode: 404, message: "Page not found" });
        }
        const previous_url = '';
        return {
            atom_name,
            atom,
            plural,
            message,
            success,
            title,
            back_label,
            error_object,
            data_object,
            previous_url,
            is_read_only
        };
    },
    beforeRouteEnter(_to, from, next) {
        next(vm => {
            vm.previous_url = from.path;
            next();
        });
    },
    methods: {
        go_back() {
            const last_path = this.previous_url.split('/').slice(-1)[0];
            if (last_path === 'new') {
                this.$router.push({ path: `/urn-admin/${this.atom_name}` });
                return;
            }
            this.$router.back();
        },
        modalAtomSelected() {
            const atom_prop_name = this.$store.state.modal_atom.atom_prop_name;
            const sel_atoms = this.$store.state.modal_atom.selected_atoms;
            if (this.$store.state.modal_atom.multiple) {
                const ids = [];
                for (const [id, is_selected] of Object.entries(sel_atoms)) {
                    if (is_selected) {
                        ids.push(id);
                    }
                }
                const old_ids = this.atom[atom_prop_name];
                const new_ids = [...new Set([...old_ids, ...ids])]; // Remove duplicates
                this.$set(this.atom, atom_prop_name, new_ids);
            }
            else {
                let sid = undefined;
                for (const [id, is_selected] of Object.entries(sel_atoms)) {
                    if (is_selected) {
                        sid = id;
                        break;
                    }
                }
                if (sid) {
                    this.$set(this.atom, atom_prop_name, sid);
                }
            }
        },
        external_submit(_event) {
            if (this.$refs.atom_form && this.$refs.atom_form.submit) {
                this.$refs.atom_form.submit();
            }
        },
        external_submit_exit(_event) {
            if (this.$refs.atom_form && this.$refs.atom_form.submit) {
                this.$refs.atom_form.submit_exit();
            }
        },
        async update() {
            const cloned_atom = _clean_atom(this.atom_name, this.atom);
            const trx_base = client_1.default.trx.base.create(this.atom_name);
            const a = 'find';
            console.log(a);
            const trx_hook = trx_base.hook('update');
            const hook_params = {
                params: {
                    id: cloned_atom._id
                },
                body: cloned_atom
            };
            const trx_response = await trx_hook(hook_params);
            urn_lib_1.urn_log.debug('[update] TRX Response: ', trx_response);
            if (!trx_response.success) {
                this.fail(trx_response);
            }
            return trx_response;
        },
        async submit(_event) {
            const trx_response = await this.update();
            if (trx_response.success) {
                this.assign_atom(trx_response.payload);
                this.$store.dispatch('notification/show_notification', {
                    type: notification_1.Notification.SUCCESS,
                    message: `${this.atom_name} updated.`,
                });
            }
            else {
                this.fail(trx_response);
            }
        },
        async submit_exit(_event) {
            const trx_response = await this.update();
            if (trx_response.success) {
                this.assign_atom(trx_response.payload);
                this.$store.dispatch('notification/show_notification', {
                    type: notification_1.Notification.SUCCESS,
                    message: `${this.atom_name} updated.`,
                });
                this.exit();
            }
            else {
                this.fail(trx_response);
            }
        },
        assign_atom(atom) {
            for (const [key, value] of Object.entries(atom)) {
                this.$set(this.atom, key, value);
            }
        },
        fail(trx_response) {
            window.scrollTo(0, 0);
            urn_lib_1.urn_log.error('ERR MSG: ', trx_response.err_msg);
            this.success = false;
            this.message = trx_response.message || 'Unknown error';
            const cloned_error = { ...trx_response };
            delete cloned_error.ex;
            this.error_object = cloned_error;
            this.$store.dispatch('notification/show_notification', {
                type: notification_1.Notification.ERROR,
                message: this.message,
            });
        },
        exit() {
            this.go_back();
            // this.$router.push({
            //   name: 'urn-admin-slug',
            //   params: {
            //     slug: this.atom_name
            //   }
            // });
        },
        async delete_atom() {
            const trx_base = client_1.default.trx.base.create(this.atom_name);
            const trx_hook = trx_base.hook('delete');
            const hook_params = {
                params: {
                    id: this.atom._id
                }
            };
            const trx_response = await trx_hook(hook_params);
            urn_lib_1.urn_log.debug('TRX Response: ', trx_response);
            if (trx_response.success) {
                this.$store.dispatch('notification/show_notification', {
                    type: notification_1.Notification.ERROR,
                    message: `${this.atom_name} deleted.`,
                });
                this.exit();
            }
            else {
                this.fail(trx_response);
            }
        }
    },
});
function _clean_atom(atom_name, atom) {
    const cloned_atom = { ...atom };
    if (cloned_atom._date) {
        delete cloned_atom._date;
    }
    // const atom_prop_defs = atom_book[atom_name].properties;
    const atom_prop_defs = client_1.default.book.get_custom_properties_definition(atom_name);
    for (const [prop_key, prop_def] of Object.entries(atom_prop_defs)) {
        if (prop_def.optional && cloned_atom[prop_key] === '') {
            delete cloned_atom[prop_key];
        }
    }
    return cloned_atom;
}
//# sourceMappingURL=_slug.js.map