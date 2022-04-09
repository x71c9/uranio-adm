"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const urn_lib_1 = require("urn-lib");
const urn_exc = urn_lib_1.urn_exception.init(`NUXT_UPLOADER`, `Nuxt Uploader`);
const client_1 = __importDefault(require("uranio/client"));
const core_1 = __importDefault(require("@uppy/core"));
const vue_2 = require("@uppy/vue");
const audio_1 = __importDefault(require("@uppy/audio"));
const webcam_1 = __importDefault(require("@uppy/webcam"));
const image_editor_1 = __importDefault(require("@uppy/image-editor"));
const xhr_upload_1 = __importDefault(require("@uppy/xhr-upload"));
const aws_s3_1 = __importDefault(require("@uppy/aws-s3"));
require("@uppy/core/dist/style.css");
require("@uppy/dashboard/dist/style.css");
require("@uppy/audio/dist/style.css");
require("@uppy/webcam/dist/style.css");
require("@uppy/image-editor/dist/style.css");
exports.default = vue_1.default.extend({
    data() {
        const target = client_1.default.conf.get('service_url') + `/media/upload`;
        const uppy_xhr_options = {
            endpoint: target,
            fieldName: 'file',
            formData: true
            // headers:{
            //   'urn-auth-token': this.$store.state.auth.token
            // }
        };
        const uppy_aws_options = {
            // limit: 1,
            // timeout: 60000, // 1 minute
            // companionUrl: 'https://uppy-companion.myapp.com/',
            getUploadParameters(file) {
                return client_1.default.trx.hooks.media.presigned(file.name, file.size, file.type)
                    .then((urn_res) => {
                    if (urn_res.success === false) {
                        throw urn_exc.create(`CANNOT_GET_PRESIGNED_URL`, `Cannot get presigned url for [${file.name}]`);
                    }
                    return {
                        method: 'put',
                        url: urn_res.payload,
                        // fields: data.fields,
                        headers: {
                            'Content-Type': file.type,
                        },
                    };
                });
            }
        };
        const uppy_options = {
            autoProceed: false,
            allowMultipleUploadBatches: true,
            debug: true,
            restrictions: {
                maxFileSize: null,
                minFileSize: null,
                maxTotalFileSize: null,
                maxNumberOfFiles: null,
                minNumberOfFiles: null,
                allowedFileTypes: null,
                // requiredMetaFields: [],
            },
            meta: {},
            // onBeforeFileAdded: (currentFile:any, _files:any) => currentFile,
            onBeforeUpload: (_files) => {
                // for(const [_key, file] of Object.entries(files)){
                //   const name = file.name;
                //   const size = file.size;
                //   const types = file.type;
                // }
            },
            // locale: {},
            // store: new DefaultStore(),
            // logger: justErrorsLogger,
            // infoTimeout: 5000,
        };
        const uppy_dashboard_options = {
            // target: 'body',
            metaFields: [
                { id: "name", name: "Name", placeholder: "filename.ext" },
                { id: "caption", name: "Caption", placeholder: "Caption" }
            ],
            trigger: null,
            // inline: false,
            // width: 750,
            // height: 'auto',
            thumbnailWidth: 280,
            // defaultTabIcon,
            showLinkToFileUploadResult: true,
            showProgressDetails: false,
            hideUploadButton: false,
            hideRetryButton: false,
            hidePauseResumeButton: false,
            hideCancelButton: false,
            hideProgressAfterFinish: false,
            // doneButtonHandler: () => {
            //   this.uppy.reset()
            //   this.requestCloseModal()
            // },
            note: null,
            closeModalOnClickOutside: false,
            closeAfterFinish: false,
            disableStatusBar: false,
            disableInformer: false,
            disableThumbnailGenerator: false,
            disablePageScrollWhenModalOpen: true,
            animateOpenClose: true,
            fileManagerSelectionType: 'files',
            proudlyDisplayPoweredByUppy: false,
            // onRequestCloseModal: () => this.closeModal(),
            showSelectedFiles: true,
            showRemoveButtonAfterComplete: false,
            // locale: defaultLocale,
            browserBackButtonClose: false,
            theme: 'dark',
            autoOpenFileEditor: false,
            disableLocalFiles: false,
        };
        const uppy_audio_optins = {
        // showAudioSourceDropdown: true
        };
        const uppy_webcam_options = {
            onBeforeSnapshot: () => Promise.resolve(),
            countdown: true,
            modes: [
                'video-audio',
                'video-only',
                'audio-only',
                'picture',
            ],
            mirror: true,
            videoConstraints: {
                facingMode: 'user',
                width: { min: 720, ideal: 1280, max: 1920 },
                height: { min: 480, ideal: 800, max: 1080 },
            },
            showRecordingLength: false,
            // preferredVideoMimeType: null,
            // preferredImageMimeType: null,
            // locale: {},
        };
        const uppy_image_editor_options = {
            // target: Dashboard,
            quality: 0.8,
            cropperOptions: {
                viewMode: 1,
                background: false,
                autoCropArea: 1,
                responsive: true,
                croppedCanvasOptions: {},
            },
            actions: {
                revert: true,
                rotate: true,
                granularRotate: true,
                flip: true,
                zoomIn: true,
                zoomOut: true,
                cropSquare: true,
                cropWidescreen: true,
                cropWidescreenVertical: true,
            },
        };
        return {
            target,
            uppy_options,
            uppy_xhr_options,
            uppy_aws_options,
            uppy_dashboard_options,
            uppy_audio_optins,
            uppy_webcam_options,
            uppy_image_editor_options,
        };
    },
    components: {
        Dashboard: vue_2.Dashboard
    },
    // layout(): string {
    //   return "urn-admin";
    // },
    computed: {
        uppy: function () {
            return new core_1.default(this.uppy_options)
                .use(aws_s3_1.default, this.uppy_aws_options)
                .use(xhr_upload_1.default, this.uppy_xhr_options)
                .use(image_editor_1.default, this.uppy_image_editor_options)
                .use(audio_1.default, this.uppy_audio_optins)
                .use(webcam_1.default, this.uppy_webcam_options)
                .on('file-added', (file) => {
                console.log('Added file', file);
            })
                .on('upload', (data) => {
                // data object consists of `id` with upload ID and `fileIDs` array
                // with file IDs in current upload
                // data: { id, fileIDs }
                console.log(`Starting upload ${data.id} for files ${data.fileIDs}`);
            })
                .on('upload-progress', (file, progress) => {
                console.log(file, progress);
            })
                .on('upload-success', (file, response) => {
                console.log('Upload successful', file, response);
            })
                .on('complete', (result) => {
                console.log('Complete: ', result);
                const atom_shape = {
                    src: result.successful[0].name,
                    filename: result.successful[0].name,
                    type: result.successful[0].type || '',
                    size: result.successful[0].size
                };
                client_1.default.trx.hooks.media.insert(atom_shape).then((urn_res) => {
                    if (urn_res.success) {
                        const atom = urn_res.payload;
                        this.$emit('add-atoms', atom);
                    }
                });
            });
        }
    },
    beforeDestroy() {
        this.uppy.close();
    },
    // mounted(){
    // },
    methods: {
        on_submit(data, s) {
            urn_lib_1.urn_log.debug(data);
            urn_lib_1.urn_log.debug(s);
        }
    }
});
//# sourceMappingURL=Uploader.js.map