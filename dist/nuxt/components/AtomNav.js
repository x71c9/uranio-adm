"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const urn_lib_1 = require("urn-lib");
const client_1 = __importDefault(require("uranio/client"));
exports.default = vue_1.default.extend({
    data() {
        const items_atom = [];
        const items_log = [];
        for (const atom_name of client_1.default.book.get_names()) {
            const atom_def = client_1.default.book.get_definition(atom_name);
            let plural = `${atom_name}s`;
            if (atom_name === 'setting') {
                continue;
            }
            if (urn_lib_1.urn_util.object.has_key(atom_def, 'plural') && atom_def.plural) {
                plural = atom_def.plural;
            }
            if (atom_def.connection === 'log') {
                items_log.push({
                    label: plural,
                    to: `/urn-admin/${atom_name}`,
                    icon: `/img/icons/@2x/workspaces-filled-1@2x.png`
                });
            }
            else {
                items_atom.push({
                    label: plural,
                    to: `/urn-admin/${atom_name}`,
                    icon: `/img/icons/svg/filter_none.svg`
                });
            }
        }
        return {
            items_atom,
            items_log
        };
    },
});
//# sourceMappingURL=AtomNav.js.map