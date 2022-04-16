
import Vue from 'vue';

import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex';

import uranio from 'uranio/client';

type ReturnState = {
	is_open: boolean
	multiple: boolean
	replace: boolean
	atom_prop_name: string
	atom_prop_atom: string
	atoms: uranio.schema.Atom<uranio.schema.AtomName>[]
	primary_properties: string[]
	selected_ids: string[]
	selected_atoms: uranio.schema.Atom<uranio.schema.AtomName>[]
	selected: {
		[k:string]: boolean
	},
}

export const state = ():ReturnState => ({
	is_open: false,
	multiple: false,
	replace: false,
	atom_prop_name: '',
	atom_prop_atom: '',
	atoms: [],
	primary_properties: ['_id'],
	selected_ids: [],
	selected_atoms: [],
	selected: {},
});

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
	selected_ids: (state) => {
		const sel_ids:string[] = [];
		for(const [id, is_selected] of Object.entries(state.selected)){
			if(is_selected){
				sel_ids.push(id);
			}
		}
		return sel_ids;
	},
	selected_atoms: (state, getters) => {
		const sel_ids = getters.selected_ids;
		const sel_atoms = [];
		for(const atom of state.atoms){
			if(sel_ids.includes(atom._id)){
				sel_atoms.push(atom);
			}
		}
		return sel_atoms;
	}
};

export const mutations: MutationTree<RootState> = {
	CHANGE_IS_OPEN: (state, is_open:boolean) => (state.is_open = is_open),
	CHANGE_ATOM_PROP_NAME: (state, atom_prop_name:string) => (state.atom_prop_name = atom_prop_name),
	CHANGE_ATOM_PROP_ATOM: (state, atom_prop_atom:string) => (state.atom_prop_atom = atom_prop_atom),
	CHANGE_MULTIPLE: (state, multiple: boolean) => (state.multiple = multiple),
	CHANGE_REPLACE: (state, replace: boolean) => (state.replace = replace),
	CHANGE_ATOMS: (state, atoms: uranio.schema.Atom<uranio.schema.AtomName>[]) => (state.atoms = atoms),
	CHANGE_PRIMARY_PROPERTIES: (state, primary_properties: string[]) => (state.primary_properties = primary_properties),
	RESET_SELECTED: (state, atoms: uranio.schema.Atom<uranio.schema.AtomName>[]) => {
		state.selected = {};
		for(const atom of atoms){
			Vue.set(state.selected, atom._id, false);
		}
	},
	SELECT_ATOM: (state, atom_id:string) => {
		if(state.multiple === false){
			for(const atom of state.atoms){
				if(atom._id !== atom_id){
					Vue.set(state.selected, atom._id, false);
				}
			}
		}
		Vue.set(state.selected, atom_id, !state.selected[atom_id]);
	}
};

export const actions: ActionTree<RootState, RootState> = {
	open_modal(
		context:ActionContext<ReturnState, RootState>,
		{ prop_name, prop_atom, multiple, replace }
	) {
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
	select_atom(context:ActionContext<ReturnState, RootState>, atom_id:string) {
		context.commit('SELECT_ATOM', atom_id);
	},
	async get_atoms(context:any){
		const atom_name = context.state.atom_prop_atom;
		const trx_base = uranio.trx.base.create(atom_name);
		const trx_response = await trx_base.hook("find")({});
		if(trx_response.success && Array.isArray(trx_response.payload)){
			context.commit('CHANGE_ATOMS', trx_response.payload);
			context.commit('RESET_SELECTED', trx_response.payload);
			const primary_properties:string[] = [];
			const prop_defs = uranio.book.get_properties_definition(atom_name);
			for(const [prop_name, prop_def] of Object.entries(prop_defs)){
				if(prop_def.primary === true){
					primary_properties.push(prop_name);
				}
			}
			if(primary_properties.length === 0){
				primary_properties.push('_id');
			}
			context.commit('CHANGE_PRIMARY_PROPERTIES', primary_properties);
		}
		// return [];
	},
	reset_atoms(context:ActionContext<ReturnState, RootState>){
		context.commit('RESET_SELECTED', context.state.atoms);
		context.commit('CHANGE_ATOMS', []);
	}
};

