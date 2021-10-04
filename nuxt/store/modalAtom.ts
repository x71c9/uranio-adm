// import { GetterTree, ActionTree, MutationTree } from 'vuex';

import Vue from 'vue';

import { ActionTree, MutationTree, ActionContext } from 'vuex';

import uranio from 'uranio';

type ReturnState = {
	is_open: boolean
	multiple: boolean
	replace: boolean
	atom_prop_name: string
	atom_prop_atom: string
	atoms: uranio.types.Atom<uranio.types.AtomName>[],
	selected_atoms: {
		[k:string]: boolean
	}
}

export const state = ():ReturnState => ({
	is_open: false,
	multiple: false,
	replace: false,
	atom_prop_name: '',
	atom_prop_atom: '',
	atoms: [],
	selected_atoms: {}
});

export type RootState = ReturnType<typeof state>

// export const getters: GetterTree<RootState, RootState> = {
//   is_open: state => state.is_open,
// };

export const mutations: MutationTree<RootState> = {
	CHANGE_IS_OPEN: (state, is_open:boolean) => (state.is_open = is_open),
	CHANGE_ATOM_PROP_NAME: (state, atom_prop_name:string) => (state.atom_prop_name = atom_prop_name),
	CHANGE_ATOM_PROP_ATOM: (state, atom_prop_atom:string) => (state.atom_prop_atom = atom_prop_atom),
	CHANGE_MULTIPLE: (state, multiple: boolean) => (state.multiple = multiple),
	CHANGE_REPLACE: (state, replace: boolean) => (state.replace = replace),
	CHANGE_ATOMS: (state, atoms: uranio.types.Atom<uranio.types.AtomName>[]) => (state.atoms = atoms),
	RESET_SELECTED_ATOMS: (state, atoms: uranio.types.Atom<uranio.types.AtomName>[]) => {
		state.selected_atoms = {};
		for(const atom of atoms){
			Vue.set(state.selected_atoms, atom._id, false);
		}
	},
	SELECT_ATOM: (state, atom_id:string) => {
		Vue.set(state.selected_atoms, atom_id, !state.selected_atoms[atom_id]);
	}
};

export const actions: ActionTree<RootState, RootState> = {
	open_modal(context:ActionContext<ReturnState, RootState>, { prop_name, prop_atom, multiple, replace }) {
		// console.log('ACTION: $store.open_modal');
		// console.log('Prop name: ', prop_name);
		// console.log('Prop Atom: ', prop_atom);
		// console.log('Multiple: ', multiple);
		// console.log('Replace: ', replace);
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
	select_atom(context:ActionContext<ReturnState, RootState>, atom_id:string) {
		context.commit('SELECT_ATOM', atom_id);
	},
	async get_atoms(context:any){
		const atom_name = context.state.atom_prop_atom;
		const trx_base = uranio.trx.base.create(atom_name);
		const trx_response = await trx_base.hook("find")({});
		if(trx_response.success && Array.isArray(trx_response.payload)){
			context.commit('CHANGE_ATOMS', trx_response.payload);
			context.commit('RESET_SELECTED_ATOMS', trx_response.payload);
		}
		return [];
	},
	reset_atoms(context:ActionContext<ReturnState, RootState>){
		context.commit('RESET_SELECTED_ATOMS', context.state.atoms);
		context.commit('CHANGE_ATOMS', []);
	}
};

