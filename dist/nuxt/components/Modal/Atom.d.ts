import Vue from 'vue';
import uranio from 'uranio/client';
declare type Data = {};
declare type Methods = {
    submit: () => void;
    select: (atom_id: string) => void;
    close: () => void;
};
declare type Computed = {
    atoms: uranio.schema.Atom<uranio.schema.AtomName>[];
    message: string;
};
declare type Props = {};
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Computed, Props>;
export default _default;
