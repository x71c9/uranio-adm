"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
exports.default = vue_1.default.extend({
    data() {
        const home_entry = {
            to: '/urn-admin',
            label: 'Home',
            icon: `/img/icons/png/dashboard.png`
        };
        return {
            home_entry
        };
    },
});
//# sourceMappingURL=SideBarBody.js.map