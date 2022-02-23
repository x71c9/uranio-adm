"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const Shared_1 = __importDefault(require("./Shared"));
exports.default = vue_1.default.extend({
    mixins: [Shared_1.default],
    data() {
        return {
            readonly: true
        };
    },
    mounted: function () {
        setTimeout(() => {
            this.readonly = false;
        }, 1000);
    }
});
//# sourceMappingURL=ENCRYPTED.js.map