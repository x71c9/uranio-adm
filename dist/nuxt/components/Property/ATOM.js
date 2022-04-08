"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_typed_mixins_1 = __importDefault(require("vue-typed-mixins"));
const urn_lib_1 = require("urn-lib");
// import { atom_book } from "uranio-books/atom";
const client_1 = __importDefault(require("uranio/client"));
const Shared_1 = __importDefault(require("./Shared"));
exports.default = (0, vue_typed_mixins_1.default)(Shared_1.default).extend({
    mixins: [Shared_1.default],
    data() {
        // const prop_name = this.prop_name;
        // const atom_def = atom_book[
        //   this.atom_name as uranio.schema.AtomName
        // ] as uranio.types.Book.BasicDefinition;
        // const atom_props = atom_def.properties;
        // const atom_prop = atom_props[prop_name] as
        //   uranio.types.Book.Definition.Property.Atom;
        const prop_def = client_1.default.book.get_property_definition(this.atom_name, this.prop_name);
        const prop_atom_name = prop_def.atom;
        return {
            prop_atom_name,
        };
    },
    methods: {
        remove() {
            urn_lib_1.urn_log.debug(this.atom);
            this.$set(this.atom, this.prop_name, '');
            urn_lib_1.urn_log.debug(this.atom);
        },
        add() {
            this.$store.dispatch('modal_atom/open_modal', {
                prop_name: this.prop_name,
                prop_atom: this.prop_atom_name,
                multiple: false,
                replace: true
            });
        }
    }
});
//# sourceMappingURL=ATOM.js.map