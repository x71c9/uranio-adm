import Vue from 'vue';
declare type Data = {
    message: string;
};
declare type Methods = {
    submit: () => void;
    select: (atom_id: string) => void;
    close: () => void;
};
declare type Computed = Record<string, never>;
declare type Props = Record<string, never>;
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Computed, Props>;
export default _default;
