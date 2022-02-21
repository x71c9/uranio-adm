import Vue from 'vue';
import uranio from 'uranio/client';
export declare enum PropState {
    VALID = "VALID",
    WARNING = "WARNING",
    ERROR = "ERROR"
}
export declare type UIAtomProp = {
    name: string;
    optional: boolean;
    state: PropState;
    focus: boolean;
    style: uranio.types.Book.Definition.Property.AdminStyle;
    error_message: string;
};
declare type UIAtomProps = {
    [k: string]: UIAtomProp;
};
declare type Data = {
    atom_props: UIAtomProps;
    error_class: boolean;
};
declare type Methods = {
    submit: (event: Event) => void;
    submit_exit: (event: Event) => void;
    delete_atom: (event: Event) => void;
    go_back: (event: Event) => void;
    validate_property: (prop_name: keyof uranio.schema.Molecule<uranio.schema.AtomName>) => boolean;
    validate_form: () => boolean;
    error: () => void;
    focus: (prop_name: string) => void;
    on_change: (prop_name: keyof uranio.schema.Molecule<uranio.schema.AtomName>) => void;
    on_keyup: (prop_name: keyof uranio.schema.Molecule<uranio.schema.AtomName>) => void;
};
declare type Computed = {};
declare type Props<A extends uranio.schema.AtomName> = {
    atom: uranio.schema.Molecule<A>;
    atom_name: A;
    call: 'insert' | 'update';
};
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Computed, Props<uranio.schema.AtomName>>;
export default _default;
