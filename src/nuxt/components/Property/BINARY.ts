
import mixins from 'vue-typed-mixins';

import shared from './Shared';

type Data = {
}

type Methods = {
	on_input: (event:Event) => void
	select: (value:boolean) => void
}

type Computed = {
}

type Props = {
}

type SimpleAtom = {
	[k:string]: any
}

export default mixins(shared).extend<Data, Methods, Computed, Props>({
	
	mixins: [shared],
	
	methods:{
		select(value:boolean):void {
			(this.molecule as SimpleAtom)[this.prop_name] = value;
		},
		on_input(event:Event):void{
			
			const target = event.target as HTMLInputElement;
			
			(this.molecule as SimpleAtom)[this.prop_name] = (target.value == "true");
			
		}
		
	}
});
