// import Vue from 'vue';

import { ActionTree, MutationTree, ActionContext } from 'vuex';

// import {urn_log} from 'urn-lib';

// import uranio from 'uranio/client';

type ReturnState = {
	logged: boolean
}

export const state = ():ReturnState => ({
	logged: false
});

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
	CHANGE_LOGGED: (state, logged:boolean) => (state.logged = logged)
};

export const actions: ActionTree<RootState, RootState> = {
	
	async set(context: ActionContext<RootState, RootState>, {key, value}):Promise<void>{
		console.log('STORE LOCALSTORAGE SET', key, value);
		switch(key){
			case 'logged':{
				context.commit('CHANGE_LOGGED', value);
				break;
			}
		}
		localStorage.setItem('uranio', JSON.stringify(context.state));
		console.log(localStorage);
	},
	
	async get<T extends keyof ReturnState>(
		context: ActionContext<RootState, RootState>,
		key: T
	):Promise<ReturnState[T]>{
		const uranio_local = JSON.parse(localStorage.getItem('uranio') || '{}');
		console.log('STORE LOCALSTORAGE GET', uranio_local, uranio_local[key]);
		context.dispatch('set', {key: key, value: uranio_local[key]});
		if(typeof uranio_local[key] !== 'undefined'){
			return uranio_local[key];
		}else{
			return context.state[key];
		}
	},
	
};

