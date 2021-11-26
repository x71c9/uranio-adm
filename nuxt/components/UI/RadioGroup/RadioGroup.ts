
import Vue from 'vue';

type RadioItems = {
	label: string
	selected: boolean
}

type Data = {
};

type Methods = {
	select_radio:(index:number) => void
}

type Computed = {
}

type Props = {
	items: RadioItems[]
}

export default Vue.extend<Data, Methods, Computed, Props>({
	props:{
		items: Array
	},
	data():Data {
		return {
		};
	},
	methods:{
		select_radio(index:number){
			for(let i = 0; i < this.items.length; i++){
				this.items[i].selected = false;
			}
			this.items[index].selected = true;
		}
	}
});
