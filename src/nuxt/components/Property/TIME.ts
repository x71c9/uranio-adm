import dateformat from 'dateformat';

import mixins from 'vue-typed-mixins';

import shared from './Shared';

type Data = {
}

type Methods = {
	on_input: (event:Event) => void
}

type Computed = {
	value: string
}

type Props = {
}

type SimpleAtom = {
	[k:string]: any
}

export default mixins(shared).extend<Data, Methods, Computed, Props>({
	
	mixins: [shared],
	
	computed:{
		value():string{
			let value = '';
			const date_string = (this.molecule as SimpleAtom)[this.prop_name];
			if(typeof date_string === 'string' && date_string !== ''){
				value = dateformat(new Date(date_string),"yyyy-mm-dd'T'HH:MM:ss");
			}
			return value;
		}
	},
	
	methods:{
		on_input(event:Event):void{
			const target = event.target as HTMLInputElement;
			(this.molecule as SimpleAtom)[this.prop_name] = target.value;
		}
	}
	
});
