
import Vue from 'vue';

import Dropzone from 'dropzone';

import {urn_log} from 'urn-lib';

import uranio from 'uranio';

type Data = {
	target: string
};

type Methods = {
	on_submit: (data:any, s:any) => void
}

type Computed = {
}

type Props = {
}

export default Vue.extend<Data, Methods, Computed, Props>({
	data():Data{
		return {
			target: uranio.conf.get(`base_url`) + `/media/upload`
		};
	},
	layout(): string {
		return "urn-admin";
	},
	mounted(){
		console.log(this.$store.state.auth.token);
		const zonedrop = new Dropzone("form.dropzone",{
			headers:{
				'x-auth-token': this.$store.state.auth.token
			}
		});
		zonedrop.on("addedfile", file => {
			urn_log.debug(`File added: ${file.name}`);
		});
		zonedrop.on("processing", file => {
			urn_log.debug(`File processing: ${file.name}`);
		});
		zonedrop.on("uploadprogress", file => {
			urn_log.debug(`Upload progress: ${file.name}`);
		});
		zonedrop.on("sending", file => {
			urn_log.debug(`Sending: ${file.name}`);
		});
		zonedrop.on("success", file => {
			urn_log.debug(`Success: ${file.name}`);
		});
		zonedrop.on("complete", file => {
			urn_log.debug(`Complete: ${file.name}`);
		});
		zonedrop.on("canceled", file => {
			urn_log.warn(`Canceled: ${file.name}`);
		});
		zonedrop.on("error", file => {
			urn_log.error(`Error: ${file.name}`);
		});
		zonedrop.on("thumbnail", file => {
			urn_log.debug(`Thumbnail: ${file.name}`);
		});
	},
	methods:{
		on_submit(data:any, s:any){
			urn_log.debug(data);
			urn_log.debug(s);
		}
	}
});
