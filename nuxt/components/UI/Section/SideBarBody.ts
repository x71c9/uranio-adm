
import Vue from 'vue';

export type Entry = {
	to: string
	label: string
	disabled?: boolean
	icon?: string
	notification?: number
}

type Data = {
	home_entry: Entry
};

type Methods = {
}

type Computed = {
}

type Props = {
}

export default Vue.extend<Data, Methods, Computed, Props>({
	data():Data {
		const home_entry = {
			to: '/urn-admin',
			label: 'Home',
			icon: `img/icons/png/dashboard.png`
		};
		return {
			home_entry
		};
	},
});
