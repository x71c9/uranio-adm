// import Vue from 'vue';

import { ActionTree, MutationTree, ActionContext } from 'vuex';

import uranio from 'uranio';

type ReturnState = {
	logged: boolean
	token: string
}

export const state = ():ReturnState => ({
	logged: false,
	token: '',
});

export type RootState = ReturnType<typeof state>

// export const getters: GetterTree<RootState, RootState> = {
//   is_open: state => state.is_open,
// };

export const mutations: MutationTree<RootState> = {
	CHANGE_LOGGED: (state, logged:boolean) => (state.logged = logged),
	CHANGE_TOKEN: (state, token:string) => (state.token = token),
};

export const actions: ActionTree<RootState, RootState> = {
	select_atom(context:ActionContext<ReturnState, RootState>, atom_id:string) {
		context.commit('SELECT_ATOM', atom_id);
	},
	async authenticate(context:ActionContext<ReturnState, RootState>){
		try{
			const token = await uranio.trx.hooks.superusers.authenticate('b@a.com', 'Password');
			context.commit('CHANGE_TOKEN', token);
			context.commit('CHANGE_LOGGED', true);
		}catch(e){
			console.error(e);
		}
	},
};

