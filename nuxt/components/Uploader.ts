
import Vue from 'vue';

import {urn_log} from 'urn-lib';

import uranio from 'uranio';

import Uppy from '@uppy/core';

import { Dashboard } from '@uppy/vue';

import Audio from '@uppy/audio';

import Webcam from '@uppy/webcam';

import ImageEditor from '@uppy/image-editor';

import XHRUpload from '@uppy/xhr-upload';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/audio/dist/style.css';
import '@uppy/webcam/dist/style.css';
import '@uppy/image-editor/dist/style.css';

type Data = {
	target: string
	uppy_options: any
	uppy_xhr_options: any
	uppy_dashboard_options: any
	uppy_audio_optins: any
	uppy_webcam_options: any
	uppy_image_editor_options: any
};

type Methods = {
	on_submit: (data:any, s:any) => void
}

type Computed = {
	uppy: Uppy
}

type Props = {
}

export default Vue.extend<Data, Methods, Computed, Props>({
	data():Data{
		
		const target =  uranio.conf.get(`base_url`) + `/media/upload`;
		
		const uppy_xhr_options = {
			endpoint: target,
			fieldName: 'file',
			headers:{
				'x-auth-token': this.$store.state.auth.token
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
			// onBeforeUpload: (_files) => {},
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
			uppy_dashboard_options,
			uppy_audio_optins,
			uppy_webcam_options,
			uppy_image_editor_options,
		};
	},
	components: {
		Dashboard
	},
	// layout(): string {
	//   return "urn-admin";
	// },
	computed: {
		uppy: function() {
			return new Uppy(this.uppy_options)
				.use(XHRUpload, this.uppy_xhr_options)
				.use(ImageEditor, this.uppy_image_editor_options)
				.use(Audio, this.uppy_audio_optins)
				.use(Webcam, this.uppy_webcam_options)
				.on('file-added', (file) => {
					console.log('Added file', file);
				})
				.on('upload', (data) => {
					// data object consists of `id` with upload ID and `fileIDs` array
					// with file IDs in current upload
					// data: { id, fileIDs }
					console.log(`Starting upload ${data.id} for files ${data.fileIDs}`);
				});
		}
	},
	beforeDestroy () {
		this.uppy.close();
	},
	// mounted(){
	// },
	methods:{
		on_submit(data:any, s:any){
			urn_log.debug(data);
			urn_log.debug(s);
		}
	}
});
