import Vue from 'vue';
import uranio from 'uranio/client';
declare type Data = Record<string, never>;
declare type Methods = Record<string, never>;
declare type Computed = Record<string, never>;
declare type Props<A extends uranio.schema.AtomName> = {
    molecule: uranio.schema.Molecule<A, uranio.schema.Depth>;
    atom_name: A;
    prop_name: keyof uranio.schema.Molecule<A>;
    prop_type: string;
    focus: boolean;
};
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Computed, Props<uranio.core.schema.AtomName>>;
export default _default;
export declare function check_if_element_is_visible(el: HTMLElement): boolean;
