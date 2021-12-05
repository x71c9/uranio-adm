
import Vue from 'vue';

import draggable from 'vuedraggable';

type Data = {
	dragging: boolean
	drag_group: string
}
type Methods = {
	drag_start: () => void
	drag_end: () => void
}
type DragOptions = {
	animation: 200,
	group: string,
	disabled: boolean,
	ghostClass: string
	dragClass: string
}
type Computed = {
	drag_options:DragOptions
}

type Props = {
}

export default Vue.extend<Data, Methods, Computed, Props>({
	data():Data {
		return {
			dragging: false,
			drag_group: ''
		};
	},
	
	components: {
		draggable,
	},
	methods:{
		drag_start():void{
			this.dragging = true;
		},
		drag_end():void{
			this.dragging = false;
		},
	},
	computed:{
		drag_options():DragOptions{
			return {
				animation: 200,
				group: this.drag_group,
				disabled: false,
				ghostClass: "ghost",
				dragClass: "dragging"
			};
		},
	},
});
