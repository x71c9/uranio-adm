import { ActionTree, MutationTree } from 'vuex';
export declare enum Notification {
    INFO = "INFO",
    SUCCESS = "SUCCESS",
    WARN = "WARN",
    ERROR = "ERROR"
}
declare type ReturnState = {
    type: Notification;
    active: boolean;
    message: string;
    timer?: ReturnType<typeof setTimeout>;
};
export declare const state: () => ReturnState;
export declare type RootState = ReturnType<typeof state>;
export declare const mutations: MutationTree<RootState>;
export declare const actions: ActionTree<RootState, RootState>;
export {};
