import uranio from 'uranio/client';
import { urn_response } from "urn-lib";
declare type SortBy = {
    [prop_name: string]: 1 | -1;
};
export declare type PageQuery = {
    index: number;
    limit: number;
    sort: SortBy;
    q: string;
};
export declare type QueryObject<T = string> = {
    page?: string | T;
    limit?: string | T;
    sort?: any;
    q?: string;
};
export declare type PageData = {
    total_pages: number;
    total_result: number;
};
declare type Data<A extends uranio.schema.AtomName, D extends uranio.schema.Depth> = {
    atom_name: A;
    atoms: uranio.schema.Molecule<A, 0>[];
    plural: string;
    is_read_only: boolean;
    empty_relation: boolean;
    total_atoms: number;
    page_query: PageQuery;
    page_data: PageData;
    message: string;
    success: boolean;
    error_object: urn_response.Fail<any>;
    molecule: uranio.schema.Molecule<A, D>;
};
declare type Methods = {
    add_atom<A extends uranio.schema.AtomName>(atom: uranio.schema.Atom<A>): void;
    get_atoms(): Promise<void>;
    replace_atoms<A extends uranio.schema.AtomName>(atoms: uranio.schema.Atom<A>[]): void;
    search_atoms(q: string): Promise<void>;
    delete_atoms(ids: string[]): Promise<void>;
    delete_all_atoms(): Promise<void>;
    update_atoms(ids: string[]): Promise<void>;
    update_all_atoms(): Promise<void>;
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
} & import("vue").default, Data<uranio.core.schema.AtomName, uranio.core.schema.Depth>, Methods, Computed, Props>;
export default _default;
/**
 * `query_obj` optional paramter will override `page_query` values
 */
export declare function query_object(page_query: PageQuery, query_obj?: QueryObject<number>): QueryObject;
export declare function get_url_query(page_query: PageQuery, query_obj?: QueryObject<number>): string;
export declare function get_url(atom_name: string, page_query: PageQuery, query_obj?: QueryObject<number>): string;
