import Vue from 'vue';
import { urn_response } from "urn-lib";
import uranio from 'uranio/client';
declare type Data = {
    atom: uranio.schema.Atom<uranio.schema.AtomName>;
    atom_name: uranio.schema.AtomName;
    plural: string;
    message: string;
    success: boolean;
    error_object: urn_response.Fail<any>;
};
declare type Methods = {
    submit: (event: Event) => Promise<void>;
    submit_exit: (event: Event) => Promise<void>;
    external_submit: (event: Event) => void;
    modalAtomSelected: (id: string | string[]) => void;
    fail: (trx_response: urn_response.Fail<any>) => void;
    exit: () => void;
    go_back: () => void;
};
declare type Props = {
    atom: uranio.schema.Atom<uranio.schema.AtomName>;
    atom_name: uranio.schema.AtomName;
};
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Props, Props>;
export default _default;
