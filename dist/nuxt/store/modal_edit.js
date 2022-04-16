"use strict";
// import Vue from 'vue';
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = exports.mutations = exports.state = void 0;
const state = () => ({
    is_open: false,
    // is_all: false,
    atom_name: undefined,
    selected_atom_ids: []
});
exports.state = state;
exports.mutations = {
    CHANGE_IS_OPEN: (state, is_open) => (state.is_open = is_open),
    // CHANGE_IS_ALL: (state, is_all: boolean) => (state.is_all = is_all),
    CHANGE_ATOM_NAME: (state, atom_name) => (state.atom_name = atom_name),
    CHANGE_SELECTED_ATOMS: (state, atom_ids) => (state.selected_atom_ids = atom_ids),
};
exports.actions = {
    open_modal(context, { atom_name, atom_ids }) {
        context.commit('CHANGE_IS_OPEN', true);
        // context.commit("CHANGE_IS_ALL", is_all);
        context.commit("CHANGE_ATOM_NAME", atom_name);
        context.commit("CHANGE_SELECTED_ATOMS", atom_ids);
    },
    close_modal({ commit }) {
        commit('CHANGE_IS_OPEN', false);
    },
};
//# sourceMappingURL=modal_edit.js.map