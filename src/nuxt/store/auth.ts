// import Vue from 'vue';

import { ActionTree, MutationTree, ActionContext } from 'vuex';

import {urn_log} from 'urn-lib';

import uranio from 'uranio/client';

type ReturnState = {
	logged: boolean
	email: string
}

export type AuthResponse = {
	email: string
	success: boolean
	message: string
}

export const state = ():ReturnState => ({
	logged: false,
	email: '',
});

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
	CHANGE_LOGGED: (state, logged:boolean) => (state.logged = logged),
	CHANGE_EMAIL: (state, email:string) => (state.email = email),
};

export const actions: ActionTree<RootState, RootState> = {
	
	async authenticate(
		context:ActionContext<ReturnState, RootState>,
		{email, password}
	):Promise<AuthResponse>{
		console.log('STORE AUTH AUTHENTICATE');
		if(context.state.logged === true){
			return {
				email: context.state.email,
				success: true,
				message: 'Already logged.'
			};
		}
		try{
			// 'uranio@uranio.xyz',
			// 'kcXkaF3Ad7KC3G3t'
			const response = await uranio.trx.hooks.superusers.authenticate(
				email,
				password
			);
			if(response.success){
				context.commit('CHANGE_EMAIL', email);
				context.dispatch('update_logged', true);
			}else{
				urn_log.error('Cannot authenticate');
				urn_log.error(response);
			}
			return {
				email: context.state.email,
				success: response.success,
				message: (response.success !== true) ?
					response.err_msg : (response.message || '')
			};
		}catch(e){
			const err = e as Error;
			return {
				email: context.state.email,
				success: false,
				message: err.message
			};
		}
	},
	
	async sign_out(
		context: ActionContext<ReturnState, RootState>
	):Promise<boolean>{
		console.log('STORE AUTH SIGNED OUT');
		context.commit('CHANGE_EMAIL', '');
		context.dispatch('update_logged', false);
		return true;
	},
	
	update_logged(context: ActionContext<ReturnState, RootState>, value:boolean):void{
		console.log('STORE AUTH UPDATE LOGGED');
		context.commit('CHANGE_LOGGED', value);
		context.dispatch('localStorage/set', {key: 'logged', value: value}, {root:true});
	}
	
};

