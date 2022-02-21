import Vue from 'vue';
declare type RadioItems = {
    label: string;
    selected: boolean;
};
declare type Data = {};
declare type Methods = {
    select_radio: (index: number) => void;
};
declare type Computed = {};
declare type Props = {
    items: RadioItems[];
};
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Computed, Props>;
export default _default;
