"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dateformat_1 = __importDefault(require("dateformat"));
const vue_typed_mixins_1 = __importDefault(require("vue-typed-mixins"));
const Shared_1 = __importDefault(require("./Shared"));
exports.default = (0, vue_typed_mixins_1.default)(Shared_1.default).extend({
    mixins: [Shared_1.default],
    computed: {
        value() {
            let value = '';
            const date_string = this.atom[this.prop_name];
            if (typeof date_string === 'string' && date_string !== '') {
                value = (0, dateformat_1.default)(new Date(date_string), "yyyy-mm-dd'T'HH:MM:ss");
            }
            return value;
        }
    },
    methods: {
        on_input(event) {
            const target = event.target;
            this.atom[this.prop_name] = target.value;
        }
    }
});
//# sourceMappingURL=TIME.js.map