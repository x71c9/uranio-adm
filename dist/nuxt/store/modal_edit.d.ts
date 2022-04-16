import { ActionTree, MutationTree } from 'vuex';
import uranio from 'uranio/client';
declare type ReturnState = {
    is_open: boolean;
    atom_name?: uranio.schema.AtomName;
    selected_atom_ids: string[];
};
export declare const state: () => ReturnState;
export declare type RootState = ReturnType<typeof state>;
export declare const mutations: MutationTree<RootState>;
export declare const actions: ActionTree<RootState, RootState>;
export {};
