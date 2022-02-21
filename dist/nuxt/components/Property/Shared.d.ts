import Vue from 'vue';
import uranio from 'uranio/client';
declare type Data = {};
declare type Methods = {};
declare type Computed = {};
declare type Props = {
    atom: uranio.schema.Atom<uranio.schema.AtomName>;
    atom_name: uranio.schema.AtomName;
    prop_name: keyof uranio.schema.Molecule<uranio.schema.AtomName>;
    prop_type: string;
    focus: boolean;
};
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Computed, Props>;
export default _default;
export declare function check_if_element_is_visible(el: HTMLElement): boolean;
