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
        //   this.atom_name as uranio.types.AtomName
        // ] as uranio.types.Book.BasicDefinition;
        // const atom_props = atom_def.properties;
        // const atom_prop = atom_props[this.prop_name] as
        //   uranio.types.Book.Definition.Property.Set;
        const prop_def = client_1.default.book.get_property_definition(this.atom_name, this.prop_name);
        const type = (prop_def.type === client_1.default.types.PropertyType.SET_NUMBER) ?
            'number' : 'string';
        const new_element = '';
        this.drag_group = this.prop_name;
        return {
            type,
            new_element
        };
    },
    methods: {
        add_element() {
            let new_element = this.new_element;
            if (this.type === 'number') {
                new_element = Number(new_element);
            }
            if (new_element !== '') {
                this.atom[this.prop_name].push(new_element);
                this.new_element = '';
            }
        },
        remove_element(element) {
            const index = this.atom[this.prop_name].indexOf(element);
            if (index > -1) {
                this.atom[this.prop_name].splice(index, 1);
            }
        }
    },
});
//# sourceMappingURL=SET.js.map