import uranio from 'uranio/client';
import { urn_response } from "urn-lib";
declare type SortBy = {
    [prop_name: string]: 1 | -1;
};
export declare type Page = {
    index: number;
    total_page_num: number;
    total_atom_count: number;
    query_limit: number;
    sort_by: SortBy;
};
declare type Data<A extends uranio.schema.AtomName> = {
    page: Page;
    atom_name: A;
    plural: string;
    atoms: uranio.schema.Molecule<A, 0>[];
    message: string;
    success: boolean;
    error_object: urn_response.Fail<any>;
    is_read_only: boolean;
};
declare type Methods = {
    add_atoms<A extends uranio.schema.AtomName>(atoms: uranio.schema.Atom<A>): void;
    delete_atoms(ids: string[]): Promise<void>;
    delete_all_atoms(): Promise<void>;
    reload_atoms(): Promise<void>;
    search_atoms(q: string): Promise<void>;
    fail(): void;
};
declare type Computed = Record<string, never>;
declare type Props = Record<string, never>;
export declare type UploadedFile = {
    id: string;
    name: string;
    url: string;
};
declare const _default: import("vue/types/vue").ExtendedVue<{
    message: string;
    success: boolean;
    error_object: urn_response.Fail<any, any>;
} & {
    fail: (trx_response: urn_response.Fail<any, any>) => void;
} & import("vue").default, Data<uranio.core.schema.AtomName>, Methods, Computed, Props>;
export default _default;
