"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
exports.default = vue_1.default.extend({
    data() {
        const message = '';
        return {
            message,
        };
    },
    methods: {
        submit() {
            this.$emit("atom_selected");
            this.$store.dispatch('modal_atom/close_modal');
            this.$store.dispatch('modal_atom/reset_atoms');
        },
        select(atom_id) {
            this.$store.dispatch('modal_atom/select_atom', atom_id);
        },
        close() {
            this.$store.dispatch('modal_atom/close_modal');
        }
    }
});
//# sourceMappingURL=Atom.js.map