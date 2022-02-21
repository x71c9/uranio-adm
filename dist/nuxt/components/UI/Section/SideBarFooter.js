"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const client_1 = __importDefault(require("uranio/client"));
const urn_lib_1 = require("urn-lib");
exports.default = vue_1.default.extend({
    data() {
        const items = [];
        for (const atom_name of client_1.default.book.get_names()) {
            const atom_def = client_1.default.book.get_definition(atom_name);
            let plural = `${atom_name}s`;
            if (atom_name !== 'setting') {
                continue;
            }
            if (urn_lib_1.urn_util.object.has_key(atom_def, 'plural') && atom_def.plural) {
                plural = atom_def.plural;
            }
            items.push({
                label: plural,
                to: `/urn-admin/${atom_name}`,
                icon: `/img/icons/png/settings.png`
            });
        }
        return {
            items
        };
    },
});
//# sourceMappingURL=SideBarFooter.js.map