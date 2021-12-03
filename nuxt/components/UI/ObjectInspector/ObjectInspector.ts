
import Vue from 'vue';
type Wrappers = {
	[k:string]: boolean
}
type Data = {
	wrappers: Wrappers
};

type Methods = {
	toggle(key:string):void
}

type Computed = {
}

type Props = {
	data: any
}

export default Vue.extend<Data, Methods, Computed, Props>({
	props:{
		data: Object
	},
	data():Data {
		const wrappers = {} as Wrappers;
		for(const [key, value] of Object.entries(this.data)){
			if(Object.prototype.toString.call(value) == '[object Array]'){
				wrappers[key] = true;
			}else if(value !== null && typeof value === 'object'){
				wrappers[key] = true;
			}
		}
		return {
			wrappers
		};
	},
	methods:{
		toggle(key:string):void{
			this.wrappers[key] = !this.wrappers[key];
		}
	}
});
