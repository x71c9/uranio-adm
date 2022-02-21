import Vue from 'vue';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/audio/dist/style.css';
import '@uppy/webcam/dist/style.css';
import '@uppy/image-editor/dist/style.css';
declare type Data = {
    target: string;
    uppy_options: any;
    uppy_xhr_options: any;
    uppy_aws_options: any;
    uppy_dashboard_options: any;
    uppy_audio_optins: any;
    uppy_webcam_options: any;
    uppy_image_editor_options: any;
};
declare type Methods = {
    on_submit: (data: any, s: any) => void;
};
declare type Computed = {
    uppy: Uppy;
};
declare type Props = {};
declare const _default: import("vue/types/vue").ExtendedVue<Vue, Data, Methods, Computed, Props>;
export default _default;
