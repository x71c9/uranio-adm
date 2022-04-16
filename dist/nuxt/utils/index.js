"use strict";
/**
 * Utils module for Admin Panel
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clean_atmo_for_multiple_update = exports.clean_atom = exports.empty_molecule = exports.merge_atoms_of_molecule_property = void 0;
const urn_lib_1 = require("urn-lib");
const client_1 = __importDefault(require("uranio/client"));
function merge_atoms_of_molecule_property(molecule, molecule_prop_name, atoms) {
    let current_atoms = (molecule)[molecule_prop_name];
    if (!Array.isArray(current_atoms)) {
        current_atoms = [];
    }
    const current_atoms_ids = [];
    for (const curr_atom of current_atoms) {
        current_atoms_ids.push(curr_atom._id);
    }
    const different_atoms = [];
    for (const atom of atoms) {
        if (!current_atoms_ids.includes(atom._id)) {
            different_atoms.push(atom);
        }
    }
    const final_atoms = [...current_atoms, ...different_atoms];
    return final_atoms;
}
exports.merge_atoms_of_molecule_property = merge_atoms_of_molecule_property;
function empty_molecule(atom_name) {
    let molecule = {};
    const atom_props = client_1.default.book.get_properties_definition(atom_name);
    for (const [prop_name, prop_def] of Object.entries(atom_props)) {
        switch (prop_def.type) {
            case client_1.default.types.PropertyType.ATOM: {
                molecule = { ...molecule, ...{ [prop_name]: null } };
                break;
            }
            case client_1.default.types.PropertyType.BINARY: {
                molecule = { ...molecule, ...{ [prop_name]: false } };
                break;
            }
            case client_1.default.types.PropertyType.FLOAT: {
                molecule = { ...molecule, ...{ [prop_name]: .0 } };
                break;
            }
            case client_1.default.types.PropertyType.ENUM_NUMBER:
            case client_1.default.types.PropertyType.INTEGER: {
                molecule = { ...molecule, ...{ [prop_name]: 0 } };
                break;
            }
            case client_1.default.types.PropertyType.SET_NUMBER:
            case client_1.default.types.PropertyType.SET_STRING:
            case client_1.default.types.PropertyType.ATOM_ARRAY: {
                molecule = { ...molecule, ...{ [prop_name]: [] } };
                break;
            }
            default: {
                molecule = { ...molecule, ...{ [prop_name]: '' } };
                break;
            }
        }
    }
    return molecule;
}
exports.empty_molecule = empty_molecule;
function clean_atom(atom_name, molecule) {
    const cloned_atom = urn_lib_1.urn_util.object.deep_clone(molecule);
    if (cloned_atom._date) {
        delete cloned_atom._date;
    }
    const atom_prop_defs = client_1.default.book.get_custom_properties_definition(atom_name);
    for (const [prop_key, prop_def] of Object.entries(atom_prop_defs)) {
        if (prop_def.optional && cloned_atom[prop_key] === '') {
            delete cloned_atom[prop_key];
        }
    }
    return cloned_atom;
}
exports.clean_atom = clean_atom;
function clean_atmo_for_multiple_update(atom_name, molecule) {
    const cloned_atom = urn_lib_1.urn_util.object.deep_clone(molecule);
    if (typeof cloned_atom._date !== 'undefined') {
        delete cloned_atom._date;
    }
    if (typeof cloned_atom._id !== 'undefined') {
        delete cloned_atom._id;
    }
    if (typeof cloned_atom._r !== 'undefined') {
        delete cloned_atom._r;
    }
    if (typeof cloned_atom._w !== 'undefined') {
        delete cloned_atom._w;
    }
    if (typeof cloned_atom._from !== 'undefined') {
        delete cloned_atom._from;
    }
    const atom_prop_defs = client_1.default.book.get_custom_properties_definition(atom_name);
    for (const [prop_key, _prop_def] of Object.entries(atom_prop_defs)) {
        if (cloned_atom[prop_key] === '') {
            delete cloned_atom[prop_key];
        }
        if (Array.isArray(cloned_atom[prop_key]) && cloned_atom[prop_key].length === 0) {
            delete cloned_atom[prop_key];
        }
    }
    return cloned_atom;
}
exports.clean_atmo_for_multiple_update = clean_atmo_for_multiple_update;
//# sourceMappingURL=index.js.map