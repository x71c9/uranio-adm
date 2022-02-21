import Vue from 'vue';
import { Page } from '../../../pages/urn-admin/_slug';
declare type Data = {
    change_page_value: number;
    item_per_page_value: number;
};
declare type Methods = {
    change_page: () => void;
    change_item_per_page: () => void;
};
declare type Computed = {};
declare type Props = {
    page: Page;
    atom_name: string;
};
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Computed, Props>;
export default _default;
