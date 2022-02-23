import Vue from 'vue';
import uranio from 'uranio/client';
declare type Checked = {
    [id: string]: boolean;
};
declare type Data = {
    checked_by_id: Checked;
    is_all_checked: boolean;
    is_all_indeterminate: boolean;
    primary_properties: string[];
    plural: string;
};
declare type Methods = {
    toggle_all: () => void;
    toggle_atom: (id: string) => void;
    check_all: () => void;
    check_none: () => void;
    reset_check: () => void;
    reload_check: () => void;
    is_indeterminate: () => boolean;
    edit_selected: () => void;
    edit_all: () => void;
    delete_selected: () => void;
    delete_all: () => void;
};
declare type Computed = {
    selected_atoms: string[];
    count_selected: number;
    count_label: string;
};
declare type Props = {
    atoms: uranio.schema.Atom<uranio.schema.AtomName>[];
    atom_name: uranio.schema.AtomName;
    is_read_only: boolean;
};
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Computed, Props>;
export default _default;
