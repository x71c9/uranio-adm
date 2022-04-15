"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_if_element_is_visible = void 0;
const vue_1 = __importDefault(require("vue"));
exports.default = vue_1.default.extend({
    inject: [
        'molecule',
        'atom_name',
        'prop_name',
        'prop_type'
    ],
    props: {
        molecule: Object,
        atom_name: String,
        prop_name: String,
        prop_type: String,
        focus: Boolean
    },
    watch: {
        focus(new_value, _old_value) {
            const $input = this.$refs['input'];
            if (new_value === true && $input && $input.focus) {
                $input.focus();
            }
            if (this.$el.offsetTop) {
                const top = this.$el.offsetTop - 34;
                if (!check_if_element_is_visible(this.$el)) {
                    window.scrollTo(0, top);
                }
            }
        }
    },
});
function check_if_element_is_visible(el) {
    const rect = el.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    // console.log(!(rect.bottom < 0 || rect.top - viewHeight >= 0));
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}
exports.check_if_element_is_visible = check_if_element_is_visible;
//# sourceMappingURL=Shared.js.map