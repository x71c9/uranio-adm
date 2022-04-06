import Vue from 'vue';
import { Entry } from '../../UI/Section/SideBarBody';
declare type Data = {
    items: Entry[];
};
declare type Methods = {
    sign_out(): Promise<void>;
};
declare type Computed = Record<string, never>;
declare type Props = Record<string, never>;
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Computed, Props>;
export default _default;
