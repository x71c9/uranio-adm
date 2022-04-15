"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_typed_mixins_1 = __importDefault(require("vue-typed-mixins"));
const Shared_1 = __importDefault(require("./Shared"));
exports.default = (0, vue_typed_mixins_1.default)(Shared_1.default).extend({
    mixins: [Shared_1.default],
    methods: {
        on_input(event) {
            const target = event.target;
            this.molecule[this.prop_name] = parseInt(target.value);
        }
    }
});
//# sourceMappingURL=INTEGER.js.map