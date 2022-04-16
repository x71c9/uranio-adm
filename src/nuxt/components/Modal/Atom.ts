import Vue from 'vue';

type Data = {
	message: string
};

type Methods = {
	submit: () => void
	select: (atom_id:string) => void;
	close: () => void;
};

type Computed = Record<string, never>

type Props = Record<string, never>

export default Vue.extend<Data, Methods, Computed, Props>({
	data():Data {
		const message = '';
		return {
			message,
		};
	},
	methods: {
		submit():void{
			this.$emit("atom_selected");
			this.$store.dispatch('modal_atom/close_modal');
			this.$store.dispatch('modal_atom/reset_atoms');
		},
		select(atom_id:string):void{
			this.$store.dispatch('modal_atom/select_atom', atom_id);
		},
		close():void{
			this.$store.dispatch('modal_atom/close_modal');
		}
	}
});
