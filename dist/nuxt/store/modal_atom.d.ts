import { GetterTree, ActionTree, MutationTree } from 'vuex';
import uranio from 'uranio/client';
declare type ReturnState = {
    is_open: boolean;
    multiple: boolean;
    replace: boolean;
    atom_prop_name: string;
    atom_prop_atom: string;
    atoms: uranio.schema.Atom<uranio.schema.AtomName>[];
    primary_properties: string[];
    selected_ids: string[];
    selected_atoms: uranio.schema.Atom<uranio.schema.AtomName>[];
    selected: {
        [k: string]: boolean;
    };
};
export declare const state: () => ReturnState;
export declare type RootState = ReturnType<typeof state>;
export declare const getters: GetterTree<RootState, RootState>;
export declare const mutations: MutationTree<RootState>;
export declare const actions: ActionTree<RootState, RootState>;
export {};
