"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const urn_lib_1 = require("urn-lib");
const client_1 = __importDefault(require("uranio/client"));
const index_1 = require("../../../utils/index");
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
        const plural = client_1.default.book.get_plural(atom_name);
        const molecule = (0, index_1.empty_molecule)(atom_name);
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
            urn_lib_1.urn_log.debug('[insert] TRX Request Body: ', atom_from_molecule);
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
        modal_atom_selected() {
            const atom_prop_name = this.$store.state.modal_atom.atom_prop_name;
            const selected_atoms = this.$store.getters['modal_atom/selected_atoms'];
            if (this.$store.state.modal_atom.replace) {
                this.$set(this.molecule, atom_prop_name, selected_atoms);
            }
            else {
                const final_atoms = (0, index_1.merge_atoms_of_molecule_property)(this.molecule, atom_prop_name, selected_atoms);
                console.log('final_atoms: ', final_atoms);
                this.$set(this.molecule, atom_prop_name, final_atoms);
                console.log('molecle: ', this.molecule);
            }
        }
    },
});
//# sourceMappingURL=new.js.map