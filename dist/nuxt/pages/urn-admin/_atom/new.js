"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const urn_lib_1 = require("urn-lib");
const client_1 = __importDefault(require("uranio/client"));
const notification_1 = require("../../../store/notification");
// function _process_atom<A extends uranio.schema.AtomName>(
//   atom_name: A,
//   partial_atom:Partial<uranio.schema.AtomShape<A>>
// ):Partial<uranio.schema.AtomShape<A>>{
//   let cloned_atom = {...partial_atom};
//   cloned_atom = uranio.atom.util.delete_undefined_optional(atom_name, partial_atom);
//   uranio.atom.validate.atom_partial(atom_name, cloned_atom);
//   return cloned_atom;
// }
function _process_atom(atom_name, partial_atom) {
    let cloned_atom = { ...partial_atom };
    cloned_atom = client_1.default.core.atom.util.delete_undefined_optional(atom_name, partial_atom);
    client_1.default.core.atom.validate.atom_shape(atom_name, cloned_atom);
    return cloned_atom;
}
exports.default = vue_1.default.extend({
    layout: "urn-admin",
    provide() {
        return {
            molecule: this.molecule,
            atom_name: this.atom_name
        };
    },
    data() {
        const message = '';
        const atom_name = this.$route.params.atom;
        const atom_def = client_1.default.book.get_definition(atom_name);
        let plural = atom_name + "s";
        if (urn_lib_1.urn_util.object.has_key(atom_def, "plural")) {
            plural = atom_def.plural;
        }
        let molecule = {};
        for (const key in atom_def.properties) {
            const prop = atom_def.properties[key];
            switch (prop.type) {
                case client_1.default.types.PropertyType.ATOM: {
                    molecule = { ...molecule, ...{ [key]: null } };
                    break;
                }
                case client_1.default.types.PropertyType.BINARY: {
                    molecule = { ...molecule, ...{ [key]: false } };
                    break;
                }
                case client_1.default.types.PropertyType.FLOAT: {
                    molecule = { ...molecule, ...{ [key]: .0 } };
                    break;
                }
                case client_1.default.types.PropertyType.ENUM_NUMBER:
                case client_1.default.types.PropertyType.INTEGER: {
                    molecule = { ...molecule, ...{ [key]: 0 } };
                    break;
                }
                case client_1.default.types.PropertyType.SET_NUMBER:
                case client_1.default.types.PropertyType.SET_STRING:
                case client_1.default.types.PropertyType.ATOM_ARRAY: {
                    molecule = { ...molecule, ...{ [key]: [] } };
                    break;
                }
                default: {
                    molecule = { ...molecule, ...{ [key]: '' } };
                    break;
                }
            }
        }
        const error_object = {};
        const success = true;
        return {
            molecule,
            atom_name,
            message,
            plural,
            error_object,
            success
        };
    },
    methods: {
        external_submit(_event) {
            if (this.$refs.atom_form && this.$refs.atom_form.submit) {
                this.$refs.atom_form.submit();
            }
        },
        go_back() {
            this.$router.back();
        },
        async submit(_event) {
            const trx_base = client_1.default.trx.base.create(this.atom_name, this.$store.state.auth.token);
            const atom_from_molecule = client_1.default.core.atom.util.molecule_to_atom(this.atom_name, this.molecule);
            const cloned_atom = _process_atom(this.atom_name, atom_from_molecule);
            const trx_hook = trx_base.hook('insert');
            const trx_response = await trx_hook({ body: cloned_atom });
            urn_lib_1.urn_log.debug('[insert] TRX Response: ', trx_response);
            if (trx_response.success) {
                this.$router.push({
                    name: 'urn-admin-atom-slug',
                    params: {
                        atom: this.atom_name,
                        slug: trx_response.payload._id
                    }
                });
            }
            else {
                this.fail(trx_response);
            }
        },
        async submit_exit(_event) {
            await this.submit(_event);
            this.exit();
        },
        exit() {
            // this.go_back();
            this.$router.push({
                name: 'urn-admin-slug',
                params: {
                    slug: this.atom_name
                }
            });
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
                this.$set(this.molecule, atom_prop_name, ids);
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
                    this.$set(this.molecule, atom_prop_name, sid);
                }
            }
        }
    },
});
//# sourceMappingURL=new.js.map