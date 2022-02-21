"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
exports.default = vue_1.default.extend({
    props: {
        checked: Boolean,
        disabled: Boolean,
        indeterminate: Boolean
    },
    data() {
        return {
        // is_checked: this.checked,
        // is_disabled: this.disabled,
        // is_indeterminate: this.indeterminate
        };
    },
    methods: {
        toggle() {
            // if(this.is_disabled === true){
            //   return;
            // }
            // if(this.is_checked === true){
            //   this.is_checked = false;
            //   this.is_indeterminate = false;
            // }else{
            //   this.is_checked = true;
            // }
        }
    }
});
//# sourceMappingURL=Checkbox.js.map