"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
exports.default = vue_1.default.extend({
    props: {},
    data() {
        return {};
    },
    methods: {
        close_notification() {
            this.$store.dispatch('notification/hide_notification');
        }
    }
});
//# sourceMappingURL=Notification.js.map