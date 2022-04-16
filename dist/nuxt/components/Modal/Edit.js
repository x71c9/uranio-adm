"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const index_1 = require("../../utils/index");
exports.default = vue_1.default.extend({
    inject: ['molecule'],
    data() {
        const message = '';
        return {
            message,
        };
    },
    methods: {
        submit_bulk_edit() {
            this.$emit('submit', this.$store.state.modal_edit.selected_atom_ids);
            this.$store.dispatch('modal_edit/close_modal');
        },
        close() {
            this.$store.dispatch('modal_edit/close_modal');
        },
        modal_atom_bulk_edit_selected() {
            const atom_prop_name = this.$store.state.modal_atom.atom_prop_name;
            const selected_atoms = this.$store.getters['modal_atom/selected_atoms'];
            if (this.$store.state.modal_atom.replace) {
                this.$set(this.molecule, atom_prop_name, selected_atoms);
            }
            else {
                const final_atoms = (0, index_1.merge_atoms_of_molecule_property)(this.molecule, atom_prop_name, selected_atoms);
                this.$set(this.molecule, atom_prop_name, final_atoms);
            }
        }
    }
});
//# sourceMappingURL=Edit.js.map