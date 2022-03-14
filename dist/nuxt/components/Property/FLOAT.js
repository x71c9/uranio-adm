"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_typed_mixins_1 = __importDefault(require("vue-typed-mixins"));
const client_1 = __importDefault(require("uranio/client"));
// import {atom_book} from 'uranio-books/atom';
const Shared_1 = __importDefault(require("./Shared"));
exports.default = (0, vue_typed_mixins_1.default)(Shared_1.default).extend({
    mixins: [Shared_1.default],
    data() {
        // const atom_name = this.atom_name as uranio.types.AtomName;
        // const atom_def = atom_book[atom_name] as uranio.types.Book.BasicDefinition;
        // const atom_prop = atom_def.properties[this.prop_name] as
        //   uranio.types.Book.Definition.Property.Float;
        const prop_def = client_1.default.book.get_property_definition(this.atom_name, this.prop_name);
        let step = 0.01;
        if (prop_def.format && prop_def.format.decimal) {
            const decimal = parseInt(prop_def.format.decimal.toString());
            if (decimal <= 0) {
                step = 1;
            }
            else {
                const pow = Math.pow(10, decimal);
                step = 1 / pow;
            }
        }
        return {
            step
        };
    },
    computed: {
        value() {
            let value = this.atom[this.prop_name];
            // const atom_name = this.atom_name as uranio.types.AtomName;
            // const atom_def = atom_book[atom_name] as uranio.types.Book.BasicDefinition;
            // const atom_prop = atom_def.properties[this.prop_name] as
            //   uranio.types.Book.Definition.Property.Float;
            const prop_def = client_1.default.book.get_property_definition(this.atom_name, this.prop_name);
            if (prop_def.format && prop_def.format.decimal) {
                const decimal = parseInt(prop_def.format.decimal.toString());
                if (typeof value === 'number') {
                    value = value.toFixed(decimal);
                }
            }
            return value;
        }
    },
    methods: {
        on_input(event) {
            const target = event.target;
            this.atom[this.prop_name] = parseFloat(target.value);
        }
    }
});
//# sourceMappingURL=FLOAT.js.map