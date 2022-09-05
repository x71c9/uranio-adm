
import Vue from 'vue';

import {urn_log, urn_exception} from 'uranio-utils';
const urn_exc = urn_exception.init(`NUXT_UPLOADER`, `Nuxt Uploader`);

import uranio from 'uranio/client';

import Uppy, { UppyFile } from '@uppy/core';
import { Dashboard } from '@uppy/vue';
import Audio from '@uppy/audio';
import Webcam from '@uppy/webcam';
import ImageEditor from '@uppy/image-editor';
import XHRUpload from '@uppy/xhr-upload';
import AwsS3 from '@uppy/aws-s3';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/audio/dist/style.css';
import '@uppy/webcam/dist/style.css';
import '@uppy/image-editor/dist/style.css';

// import {UploadedFile} from '../pages/urn-admin/_slug';

type Data = {
	target: string
	uppy_options: any
	uppy_xhr_options: any
	uppy_aws_options: any
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

type UppyFiles = {
	[k:string]: UppyFile
}

export default Vue.extend<Data, Methods, Computed, Props>({
	data():Data{
		
		const target =  uranio.conf.get_service_url() + `/_media/upload`;
		
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
			getUploadParameters (file:any) {
				
				return uranio.trx.hooks._media.presigned(file.name, file.size, file.type)
					.then((urn_res) => {
						if(urn_res.success === false){
							throw urn_exc.create(
								`CANNOT_GET_PRESIGNED_URL`,
								`Cannot get presigned url for [${file.name}]`
							);
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
			onBeforeUpload: (_files:UppyFiles) => {
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
		Dashboard
	},
	// layout(): string {
	//   return "urn-admin";
	// },
	computed: {
		uppy: function() {
			return new Uppy(this.uppy_options)
				.use(AwsS3, this.uppy_aws_options)
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
				})
				.on('upload-progress', (file, progress) => {
					console.log(file, progress);
				})
				.on('upload-success', (file, response) => {
					console.log('Upload successful', file, response);
				})
				.on('complete', (result) => {
					
					console.log('Complete: ', result);
					
					const atom_shape:uranio.schema.AtomShape<'_media'> = {
						src: result.successful[0].name,
						filename: result.successful[0].name,
						type: result.successful[0].type || '',
						size: result.successful[0].size
					};
					uranio.trx.hooks._media.insert(atom_shape).then((urn_res) => {
						if(urn_res.success){
							const atom = urn_res.payload;
							this.$emit('add-atom', atom);
						}
					});
					
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
