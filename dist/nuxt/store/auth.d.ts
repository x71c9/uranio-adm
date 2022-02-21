import { ActionTree, MutationTree } from 'vuex';
declare type ReturnState = {
    logged: boolean;
};
export declare const state: () => ReturnState;
export declare type RootState = ReturnType<typeof state>;
export declare const mutations: MutationTree<RootState>;
export declare const actions: ActionTree<RootState, RootState>;
export {};
