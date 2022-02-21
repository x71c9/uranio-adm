
import { ActionTree, MutationTree, ActionContext } from 'vuex';

export enum Notification {
	INFO = 'INFO',
	SUCCESS = 'SUCCESS',
	WARN = 'WARN',
	ERROR = 'ERROR'
}

type ReturnState = {
	type: Notification
	active: boolean
	message: string
	timer?: ReturnType<typeof setTimeout>
}

export const state = ():ReturnState => ({
	type: Notification.INFO,
	active: false,
	message: '',
	timer: undefined
});

export type RootState = ReturnType<typeof state>

// export const getters: GetterTree<RootState, RootState> = {
//   is_open: state => state.is_open,
// };

export const mutations: MutationTree<RootState> = {
	CHANGE_TYPE: (state, type:Notification) => (state.type = type),
	CHANGE_ACTIVE: (state, active:boolean) => (state.active = active),
	CHANGE_MESSAGE: (state, msg:string) => (state.message = msg.charAt(0).toUpperCase() + msg.slice(1)),
	SET_TIMER: (state, timeout_id:ReturnType<typeof setTimeout>) => (state.timer = timeout_id),
};

export const actions: ActionTree<RootState, RootState> = {
	show_notification(context:ActionContext<ReturnState, RootState>, { type, message }) {
		context.commit('CHANGE_TYPE', type);
		context.commit('CHANGE_MESSAGE', message);
		context.commit('CHANGE_ACTIVE', true);
		clearTimeout(context.state.timer as ReturnType<typeof setTimeout>);
		context.commit('SET_TIMER', setTimeout(() => {
			context.dispatch('hide_notification');
		}, 4000));
	},
	hide_notification(context:ActionContext<ReturnState, RootState>) {
		clearTimeout(context.state.timer as ReturnType<typeof setTimeout>);
		context.commit('CHANGE_ACTIVE', false);
	}
};

