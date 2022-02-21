// import Vue from 'vue';

import { ActionTree, MutationTree, ActionContext } from 'vuex';

import uranio from 'uranio/client';

type ReturnState = {
	logged: boolean
	// token: string
}

export const state = ():ReturnState => ({
	logged: false,
	// token: '',
});

export type RootState = ReturnType<typeof state>

// export const getters: GetterTree<RootState, RootState> = {
//   is_open: state => state.is_open,
// };

export const mutations: MutationTree<RootState> = {
	CHANGE_LOGGED: (state, logged:boolean) => (state.logged = logged),
	// CHANGE_TOKEN: (state, token:string) => (state.token = token),
};

export const actions: ActionTree<RootState, RootState> = {
	async authenticate(context:ActionContext<ReturnState, RootState>){
		if(context.state.logged === true){
			return;
		}
		try{
			const response = await uranio.trx.hooks.superusers.authenticate(
				'uranio@uranio.xyz',
				'kcXkaF3Ad7KC3G3t'
			);
			if(response.success){
				// context.commit('CHANGE_TOKEN', response.payload.token);
				context.commit('CHANGE_LOGGED', true);
			}else{
				console.error('Cannot authenticate', response);
			}
		}catch(e){
			console.error(e);
		}
	},
};

