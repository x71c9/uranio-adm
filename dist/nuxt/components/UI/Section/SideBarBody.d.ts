import Vue from 'vue';
export declare type Entry = {
    to: string;
    label: string;
    disabled?: boolean;
    icon?: string;
    notification?: number;
};
declare type Data = {
    home_entry: Entry;
};
declare type Methods = {};
declare type Computed = {};
declare type Props = {};
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Computed, Props>;
export default _default;
