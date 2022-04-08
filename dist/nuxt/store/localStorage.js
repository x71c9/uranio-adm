"use strict";
// import Vue from 'vue';
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = exports.mutations = exports.state = void 0;
const state = () => ({
    logged: false
});
exports.state = state;
exports.mutations = {
    CHANGE_LOGGED: (state, logged) => (state.logged = logged)
};
exports.actions = {
    async set(context, { key, value }) {
        console.log('STORE LOCALSTORAGE SET', key, value);
        switch (key) {
            case 'logged': {
                context.commit('CHANGE_LOGGED', value);
                break;
            }
        }
        localStorage.setItem('uranio', JSON.stringify(context.state));
        console.log(localStorage);
    },
    async get(context, key) {
        const uranio_local = JSON.parse(localStorage.getItem('uranio') || '{}');
        console.log('STORE LOCALSTORAGE GET', uranio_local, uranio_local[key]);
        context.dispatch('set', { key: key, value: uranio_local[key] });
        if (typeof uranio_local[key] !== 'undefined') {
            return uranio_local[key];
        }
        else {
            return context.state[key];
        }
    },
};
//# sourceMappingURL=localStorage.js.map