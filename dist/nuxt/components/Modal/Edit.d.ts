import Vue from 'vue';
import uranio from 'uranio/client';
declare type Data = {
    message: string;
};
declare type Methods = {
    submit_bulk_edit: () => void;
    close: () => void;
    modal_atom_bulk_edit_selected: () => void;
};
declare type Computed = Record<string, never>;
declare type Props<A extends uranio.schema.AtomName, D extends uranio.schema.Depth> = {
    molecule: uranio.schema.Molecule<A, D>;
};
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Computed, Props<uranio.core.schema.AtomName, uranio.core.schema.Depth>>;
export default _default;
