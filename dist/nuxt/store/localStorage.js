"use strict";
// import Vue from 'vue';
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = exports.mutations = exports.state = void 0;
const state = () => ({
// logged: false
});
exports.state = state;
exports.mutations = {
// CHANGE_LOCAL_STORAGE_LOGGED: (state, logged:boolean) => (state.logged = logged),
};
exports.actions = {
    async init(_context) {
        console.log('STORE LOCAL STORAGE INIT');
        // const local_storage_uranio = JSON.parse(localStorage.getItem('uranio') || '{}');
        // const logged = (typeof local_storage_uranio['logged'] !== 'undefined') ?
        // 	local_storage_uranio['logged'] : context.state.logged;
        // console.log('STORE LOCAL STORAGE INIT. logged: ', logged);
        // context.commit('CHANGE_LOCAL_STORAGE_LOGGED', logged);
        // await context.dispatch('auth/check_logged', undefined, {root: true});
    },
    set(context, { key, value }) {
        console.log(`STORE LOCAL STORAGE SET. key: ${key} value: ${value}`);
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
//# sourceMappingURL=localStorage.js.map