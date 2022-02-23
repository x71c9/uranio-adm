"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
exports.default = vue_1.default.extend({
    props: {
        data: Object
    },
    data() {
        const wrappers = {};
        for (const [key, value] of Object.entries(this.data)) {
            if (Object.prototype.toString.call(value) == '[object Array]') {
                wrappers[key] = true;
            }
            else if (value !== null && typeof value === 'object') {
                wrappers[key] = true;
            }
        }
        return {
            wrappers
        };
    },
    methods: {
        toggle(key) {
            this.wrappers[key] = !this.wrappers[key];
        }
    }
});
//# sourceMappingURL=ObjectInspector.js.map