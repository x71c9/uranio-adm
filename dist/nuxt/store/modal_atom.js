"use strict";
// import { GetterTree, ActionTree, MutationTree } from 'vuex';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = exports.mutations = exports.state = void 0;
const vue_1 = __importDefault(require("vue"));
const client_1 = __importDefault(require("uranio/client"));
const state = () => ({
    is_open: false,
    multiple: false,
    replace: false,
    atom_prop_name: '',
    atom_prop_atom: '',
    atoms: [],
    selected_atoms: {}
});
exports.state = state;
// export const getters: GetterTree<RootState, RootState> = {
//   is_open: state => state.is_open,
// };
exports.mutations = {
    CHANGE_IS_OPEN: (state, is_open) => (state.is_open = is_open),
    CHANGE_ATOM_PROP_NAME: (state, atom_prop_name) => (state.atom_prop_name = atom_prop_name),
    CHANGE_ATOM_PROP_ATOM: (state, atom_prop_atom) => (state.atom_prop_atom = atom_prop_atom),
    CHANGE_MULTIPLE: (state, multiple) => (state.multiple = multiple),
    CHANGE_REPLACE: (state, replace) => (state.replace = replace),
    CHANGE_ATOMS: (state, atoms) => (state.atoms = atoms),
    RESET_SELECTED_ATOMS: (state, atoms) => {
        state.selected_atoms = {};
        for (const atom of atoms) {
            vue_1.default.set(state.selected_atoms, atom._id, false);
        }
    },
    SELECT_ATOM: (state, atom_id) => {
        if (state.multiple === false) {
            for (const atom of state.atoms) {
                if (atom._id !== atom_id) {
                    vue_1.default.set(state.selected_atoms, atom._id, false);
                }
            }
        }
        vue_1.default.set(state.selected_atoms, atom_id, !state.selected_atoms[atom_id]);
    }
};
exports.actions = {
    open_modal(context, { prop_name, prop_atom, multiple, replace }) {
        // urn_log.debug('ACTION: $store.open_modal');
        // urn_log.debug('Prop name: ', prop_name);
        // urn_log.debug('Prop Atom: ', prop_atom);
        // urn_log.debug('Multiple: ', multiple);
        // urn_log.debug('Replace: ', replace);
        context.commit('CHANGE_IS_OPEN', true);
        context.commit('CHANGE_ATOM_PROP_NAME', prop_name);
        context.commit('CHANGE_ATOM_PROP_ATOM', prop_atom);
        context.commit("CHANGE_MULTIPLE", multiple);
        context.commit("CHANGE_REPLACE", replace);
        context.dispatch('get_atoms', {});
    },
    close_modal({ commit }) {
        commit('CHANGE_IS_OPEN', false);
    },
    select_atom(context, atom_id) {
        context.commit('SELECT_ATOM', atom_id);
    },
    async get_atoms(context) {
        const atom_name = context.state.atom_prop_atom;
        const trx_base = client_1.default.trx.base.create(atom_name);
        const trx_response = await trx_base.hook("find")({});
        if (trx_response.success && Array.isArray(trx_response.payload)) {
            context.commit('CHANGE_ATOMS', trx_response.payload);
            context.commit('RESET_SELECTED_ATOMS', trx_response.payload);
        }
        return [];
    },
    reset_atoms(context) {
        context.commit('RESET_SELECTED_ATOMS', context.state.atoms);
        context.commit('CHANGE_ATOMS', []);
    }
};
//# sourceMappingURL=modal_atom.js.map