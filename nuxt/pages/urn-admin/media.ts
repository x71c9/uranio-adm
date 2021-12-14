
import Vue from 'vue';

// import Dropzone from 'dropzone';

type Data = {
};

type Methods = {
}

type Computed = {
}

type Props = {
}

export default Vue.extend<Data, Methods, Computed, Props>({
	layout(): string {
		return "urn-admin";
	},
	mounted(){
		// const zonedrop = new Dropzone("form.dropzone");
		// zonedrop.on("addedfile", file => {
		//   console.log(`File added: ${file.name}`);
		// });
	},
	data():Data{
		return {
		};
	}
});
