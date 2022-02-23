import Vue from 'vue';
declare type Data = {
    dragging: boolean;
    drag_group: string;
};
declare type Methods = {
    drag_start: () => void;
    drag_end: () => void;
};
declare type DragOptions = {
    animation: 200;
    group: string;
    disabled: boolean;
    ghostClass: string;
    dragClass: string;
};
declare type Computed = {
    drag_options: DragOptions;
};
declare type Props = {};
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Computed, Props>;
export default _default;
