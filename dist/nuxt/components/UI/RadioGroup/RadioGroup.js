"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
exports.default = vue_1.default.extend({
    props: {
        items: Array
    },
    data() {
        return {};
    },
    methods: {
        select_radio(index) {
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].selected = false;
            }
            this.items[index].selected = true;
        }
    }
});
//# sourceMappingURL=RadioGroup.js.map