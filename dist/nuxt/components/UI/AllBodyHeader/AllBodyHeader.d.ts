import Vue from "vue";
import uranio from 'uranio/client';
import { Page } from '../../../pages/urn-admin/_slug';
declare type SortValue = {
    [prop_name: string]: 1 | -1;
};
declare type SortItem = {
    label: string;
    selected: boolean;
    value: SortValue;
};
declare type Data = {
    sort_items: SortItem[];
    sort_list_visible: boolean;
    from_blur: boolean;
    total_label: string;
    connection: string;
    dock_url: string;
    search_input_focused: boolean;
    sorted_by: string;
    sorted_direction: 1 | -1;
};
declare type Methods = {
    update_sort: () => void;
    on_sort_list_blur: () => void;
    toggle_sort_list: () => void;
};
declare type Computed = {
    total_atom_count_format: string;
};
declare type Props = {
    page: Page;
    plural: string;
    atoms: uranio.schema.Atom<uranio.schema.AtomName>[];
    atom_name: uranio.schema.AtomName;
};
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Computed, Props>;
export default _default;