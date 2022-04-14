import Vue from 'vue';
import { PageData, PageQuery } from '../../../pages/urn-admin/_slug';
declare type Data = {
    change_page_value: number;
    item_per_page_value: number;
};
declare type Methods = {
    change_page: () => void;
    change_item_per_page: () => void;
    limit_link: (limit: number) => string;
};
declare type Computed = {
    previous_link: string;
    next_link: string;
    page_links: string[];
};
declare type Props = {
    page_query: PageQuery;
    page_data: PageData;
    atom_name: string;
};
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Computed, Props>;
export default _default;
