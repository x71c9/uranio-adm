// import Vue from 'vue';

import { ActionTree, MutationTree, ActionContext } from 'vuex';

import {urn_log} from 'urn-lib';

// import uranio from 'uranio/client';

type LocalStorageState = {
	// logged: boolean
}

export const state = ():LocalStorageState => ({
	// logged: false
});

export const mutations: MutationTree<LocalStorageState> = {
	// CHANGE_LOCAL_STORAGE_LOGGED: (state, logged:boolean) => (state.logged = logged),
};

export const actions: ActionTree<LocalStorageState, LocalStorageState> = {
	
	async init(
		_context: ActionContext<LocalStorageState, LocalStorageState>
	){
		urn_log.debug('Store local_storage init.');
		// const local_storage_uranio = JSON.parse(localStorage.getItem('uranio') || '{}');
		// const logged = (typeof local_storage_uranio['logged'] !== 'undefined') ?
		// 	local_storage_uranio['logged'] : context.state.logged;
		// console.log('STORE LOCAL STORAGE INIT. logged: ', logged);
		// context.commit('CHANGE_LOCAL_STORAGE_LOGGED', logged);
		// await context.dispatch('auth/check_logged', undefined, {root: true});
	},
	
	set(
		context: ActionContext<LocalStorageState, LocalStorageState>,
		// {key, value}
	):void{
		// switch(key){
		// 	case 'logged':{
		// 		context.commit('CHANGE_LOCAL_STORAGE_LOGGED', value);
		// 		break;
		// 	}
		// }
		localStorage.setItem('uranio', JSON.stringify(context.state));
	},
	
	// get<T extends keyof LocalStorageState>(
	// 	context: ActionContext<LocalStorageState, LocalStorageState>,
	// 	key: T
	// ):LocalStorageState[T]{
	// 	const uranio_local = JSON.parse(localStorage.getItem('uranio') || '{}');
	// 	const value = (typeof uranio_local[key] !== 'undefined') ?
	// 		uranio_local[key] : context.state[key];
	// 	context.dispatch('set', {key: key, value: value});
	// 	return value;
	// },
	
};

