import Vue from 'vue';
declare type Wrappers = {
    [k: string]: boolean;
};
declare type Data = {
    wrappers: Wrappers;
};
declare type Methods = {
    toggle(key: string): void;
};
declare type Computed = {};
declare type Props = {
    data: any;
};
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Computed, Props>;
export default _default;
