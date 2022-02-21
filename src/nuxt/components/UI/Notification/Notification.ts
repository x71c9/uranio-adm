
import Vue from 'vue';

type Data = {
};

type Methods = {
}

type Computed = {
}

type Props = {
}

export default Vue.extend<Data, Methods, Computed, Props>({
	props: {
	},
	data():Data {
		return {
		};
	},
	methods: {
		close_notification():void{
			this.$store.dispatch('notification/hide_notification');
		}
	}
});
