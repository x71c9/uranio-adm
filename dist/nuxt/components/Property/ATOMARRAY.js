"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_typed_mixins_1 = __importDefault(require("vue-typed-mixins"));
// import { atom_book } from "uranio-books/atom";
const client_1 = __importDefault(require("uranio/client"));
const Shared_1 = __importDefault(require("./Shared"));
const Sortable_1 = __importDefault(require("./Sortable"));
exports.default = (0, vue_typed_mixins_1.default)(Shared_1.default, Sortable_1.default).extend({
    mixins: [Shared_1.default, Sortable_1.default],
    data() {
        const prop_def = client_1.default.book.get_property_definition(this.atom_name, this.prop_name);
        const prop_atom_name = prop_def.atom;
        if (!this.molecule[this.prop_name]) {
            this.$set(this.molecule, this.prop_name, []);
        }
        const prop_primary_properties = [];
        const subatom_prop_defs = client_1.default.book.get_properties_definition(prop_atom_name);
        for (const [subatom_prop_name, subatom_prop_def] of Object.entries(subatom_prop_defs)) {
            if (subatom_prop_def.primary === true) {
                prop_primary_properties.push(subatom_prop_name);
            }
        }
        this.drag_group = this.prop_name;
        return {
            prop_atom_name,
            prop_primary_properties
        };
    },
    methods: {
        remove(atom_id) {
            const index = this.molecule[this.prop_name].indexOf(atom_id);
            if (index !== -1) {
                this.molecule[this.prop_name].splice(index, 1);
            }
        },
        add() {
            this.$store.dispatch('modal_atom/open_modal', {
                prop_name: this.prop_name,
                prop_atom: this.prop_atom_name,
                multiple: true,
                replace: false
            });
        }
    },
});
//# sourceMappingURL=ATOMARRAY.js.map