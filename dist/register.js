"use strict";
/**
 * Register module for URANIO Api
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./reg/index");
const atoms_1 = require("./atoms");
for (const [atom_name, atom_def] of Object.entries(atoms_1.atom_book)) {
    (0, index_1.register)(atom_def, atom_name);
}
//# sourceMappingURL=register.js.map