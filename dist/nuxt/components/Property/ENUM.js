"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_typed_mixins_1 = __importDefault(require("vue-typed-mixins"));
const client_1 = __importDefault(require("uranio/client"));
const Shared_1 = __importDefault(require("./Shared"));
// type SimpleAtom = {
//   [k:string]: any
// }
exports.default = (0, vue_typed_mixins_1.default)(Shared_1.default).extend({
    mixins: [Shared_1.default],
    data() {
        const prop_def = client_1.default.book.get_property_definition(this.atom_name, this.prop_name);
        const enum_values = prop_def.values;
        const enum_type = prop_def.type;
        let prop_label = this.prop_name;
        if (prop_def.label) {
            prop_label = prop_def.label;
        }
        return {
            enum_values,
            enum_type,
            prop_label
        };
    },
    methods: {
        on_change(event) {
            const target = event.target;
            let target_value = target.value;
            if (this.enum_type === client_1.default.types.PropertyType.ENUM_NUMBER) {
                target_value = Number(target_value);
            }
            // (this.atom as SimpleAtom)[this.prop_name] = target_value;
            this.atom[this.prop_name] = target_value;
        }
    }
});
//# sourceMappingURL=ENUM.js.map