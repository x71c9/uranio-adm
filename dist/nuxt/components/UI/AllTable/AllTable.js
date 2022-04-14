"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const client_1 = __importDefault(require("uranio/client"));
exports.default = vue_1.default.extend({
    inject: [
        'atoms',
        'atom_name',
        'is_read_only'
    ],
    props: {
        atoms: Array,
        atom_name: Object,
        is_read_only: Boolean
    },
    data() {
        const checked_by_id = {};
        for (let i = 0; i < this.atoms.length; i++) {
            checked_by_id[this.atoms[i]._id] = false;
        }
        const is_all_checked = false;
        const is_all_indeterminate = false;
        const prop_defs = client_1.default.book.get_properties_definition(this.atom_name);
        const primary_properties = [];
        for (const [prop_key, prop_def] of Object.entries(prop_defs)) {
            if (prop_def.primary === true) {
                primary_properties.push(prop_key);
            }
        }
        const atom_def = client_1.default.book.get_definition(this.atom_name);
        const plural = atom_def.plural || this.atom_name + 's';
        return {
            checked_by_id,
            is_all_checked,
            is_all_indeterminate,
            primary_properties,
            plural
        };
    },
    computed: {
        selected_atoms() {
            const selected_atoms = [];
            for (const id in this.checked_by_id) {
                if (this.checked_by_id[id] === true) {
                    selected_atoms.push(id);
                }
            }
            return selected_atoms;
        },
        count_selected() {
            return this.selected_atoms.length;
        },
        count_label() {
            return (this.count_selected > 1) ? this.plural : this.atom_name;
        }
    },
    methods: {
        edit_selected() {
            // console.log(this.selected_atoms);
        },
        edit_all() {
            // console.log('edit all');
        },
        delete_selected() {
            this.$emit('delete_atoms', this.selected_atoms);
        },
        delete_all() {
            this.$emit('delete_all_atoms');
        },
        reload_check() {
            const checked_by_id = {};
            for (let i = 0; i < this.atoms.length; i++) {
                checked_by_id[this.atoms[i]._id] = false;
            }
            this.checked_by_id = Object.assign({}, checked_by_id);
            // console.log(this.checked_by_id);
        },
        reset_check() {
            for (const [id, _value] of Object.entries(this.checked_by_id)) {
                this.$delete(this.checked_by_id, id);
            }
            this.is_all_checked = false;
            this.is_all_indeterminate = false;
        },
        toggle_all() {
            if (this.is_all_checked === false) {
                this.check_all();
            }
            else {
                this.check_none();
            }
        },
        check_all() {
            for (let i = 0; i < this.atoms.length; i++) {
                this.$set(this.checked_by_id, this.atoms[i]._id, true);
            }
            this.is_all_checked = true;
            this.is_all_indeterminate = false;
        },
        check_none() {
            for (let i = 0; i < this.atoms.length; i++) {
                this.$set(this.checked_by_id, this.atoms[i]._id, false);
            }
            this.is_all_checked = false;
            this.is_all_indeterminate = false;
        },
        is_indeterminate() {
            return this.atoms.length !== this.count_selected;
        },
        toggle_atom(id) {
            this.checked_by_id[id] = !this.checked_by_id[id];
            if (this.is_indeterminate()) {
                this.is_all_indeterminate = true;
            }
            else {
                this.is_all_indeterminate = false;
            }
            if (this.checked_by_id[id] === true) {
                this.is_all_checked = true;
            }
            else if (this.count_selected === 0) {
                this.is_all_checked = false;
            }
            // console.log('toggle: ', this.checked_by_id);
        },
    }
});
//# sourceMappingURL=AllTable.js.map