import Vue from 'vue';
import { urn_response } from "urn-lib";
declare type Data = {
    message: string;
    success: boolean;
    error_object: urn_response.Fail<any>;
};
declare type Methods = {
    fail: (trx_response: urn_response.Fail<any>) => void;
};
declare type Computed = {};
declare type Props = {};
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Computed, Props>;
export default _default;
