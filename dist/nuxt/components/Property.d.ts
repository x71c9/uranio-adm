import Vue from 'vue';
import uranio from 'uranio/client';
import { UIAtomProp } from '../components/Form/Atom';
declare type Data = {
    prop_type: string;
    prop_label: string;
    prop_key: string;
    type_type: string;
};
declare type Methods = {};
declare type Computed = {
    prop_classes: string;
};
declare type Props = {
    atom: uranio.schema.Atom<uranio.schema.AtomName>;
    atom_name: string;
    prop: UIAtomProp;
};
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Computed, Props>;
export default _default;
