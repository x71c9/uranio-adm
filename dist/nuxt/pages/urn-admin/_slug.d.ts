import uranio from 'uranio/client';
import { urn_response } from "urn-lib";
declare type SortBy = {
    [prop_name: string]: 1 | -1;
};
export declare type PageQuery<T = number, S = SortBy> = {
    index: T;
    limit: T;
    sort: S;
    q: string;
};
declare type Data<A extends uranio.schema.AtomName> = {
    atom_name: A;
    atoms: uranio.schema.Molecule<A, 0>[];
    total_pages: number;
    total_result: number;
    plural: string;
    is_read_only: boolean;
    total_atoms: number;
    page_query: PageQuery;
    message: string;
    success: boolean;
    error_object: urn_response.Fail<any>;
};
declare type Methods = {
    get_atoms(): void;
    count_atoms(): void;
    add_atom<A extends uranio.schema.AtomName>(atom: uranio.schema.Atom<A>): void;
    delete_atoms(ids: string[]): Promise<void>;
    delete_all_atoms(): Promise<void>;
    update_atoms<A extends uranio.schema.AtomName>(atom_shape: uranio.schema.AtomShape<A>): Promise<void>;
    update_all_atoms<A extends uranio.schema.AtomName>(atom_shape: uranio.schema.AtomShape<A>): Promise<void>;
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
} & import("vue").default, Data<uranio.core.schema.AtomName>, Methods, Computed, Record<Props, any>>;
export default _default;
