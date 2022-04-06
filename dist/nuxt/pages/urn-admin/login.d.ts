import Vue from 'vue';
declare type Data = {
    email: string;
    password: string;
    error_email: string;
    error_password: string;
    error_general: string;
    general_message: string;
};
declare type Methods = {
    authenticate: () => Promise<boolean>;
    validate: () => boolean;
    submit: () => Promise<void>;
};
declare type Computed = Record<string, never>;
declare type Props = Record<string, never>;
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Computed, Props>;
export default _default;
