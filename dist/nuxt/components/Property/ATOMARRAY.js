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
exports.default = vue_typed_mixins_1.default(Shared_1.default, Sortable_1.default).extend({
    mixins: [Shared_1.default, Sortable_1.default],
    data() {
        // const atom_def = atom_book[
        //   this.atom_name as uranio.schema.AtomName
        // ] as uranio.types.Book.BasicDefinition;
        // const atom_props = atom_def.properties;
        // const atom_prop = atom_props[this.prop_name] as
        //   uranio.types.Book.Definition.Property.AtomArray;
        const prop_def = client_1.default.book.get_property_definition(this.atom_name, this.prop_name);
        const prop_atom_name = prop_def.atom;
        if (!this.atom[this.prop_name]) {
            this.$set(this.atom, this.prop_name, []);
        }
        this.drag_group = this.prop_name;
        return {
            prop_atom_name,
        };
    },
    methods: {
        remove(atom_id) {
            const index = this.atom[this.prop_name].indexOf(atom_id);
            if (index !== -1) {
                this.atom[this.prop_name].splice(index, 1);
            }
        },
        add() {
            this.$store.dispatch('modalAtom/open_modal', {
                prop_name: this.prop_name,
                prop_atom: this.prop_atom_name,
                multiple: true,
                replace: false
            });
        }
    },
});
//# sourceMappingURL=ATOMARRAY.js.map