// import Vue from 'vue';

import { ActionTree, MutationTree, ActionContext } from 'vuex';

import uranio from 'uranio/client';

type ReturnState = {
	is_open: boolean
	// is_all: boolean
	atom_name?: uranio.schema.AtomName
	selected_atom_ids: string[]
}

export const state = ():ReturnState => ({
	is_open: false,
	// is_all: false,
	atom_name: undefined,
	selected_atom_ids: []
});

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
	CHANGE_IS_OPEN: (state, is_open:boolean) => (state.is_open = is_open),
	// CHANGE_IS_ALL: (state, is_all: boolean) => (state.is_all = is_all),
	CHANGE_ATOM_NAME: (state, atom_name: uranio.schema.AtomName) => (state.atom_name = atom_name),
	CHANGE_SELECTED_ATOMS: (state, atom_ids: string[]) => (state.selected_atom_ids = atom_ids),
};

export const actions: ActionTree<RootState, RootState> = {
	open_modal(
		context:ActionContext<ReturnState, RootState>,
		{ atom_name, atom_ids }
	) {
		context.commit('CHANGE_IS_OPEN', true);
		// context.commit("CHANGE_IS_ALL", is_all);
		context.commit("CHANGE_ATOM_NAME", atom_name);
		context.commit("CHANGE_SELECTED_ATOMS", atom_ids);
	},
	close_modal({ commit }) {
		commit('CHANGE_IS_OPEN', false);
	},
};

