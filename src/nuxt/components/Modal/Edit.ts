import Vue from 'vue';

import uranio from 'uranio/client';

import {merge_atoms_of_molecule_property} from '../../utils/index';

type Data = {
	message: string
};

type Methods = {
	submit_bulk_edit: () => void
	close: () => void
	modal_atom_bulk_edit_selected: () => void
};

type Computed = Record<string, never>

type Props<A extends uranio.schema.AtomName, D extends uranio.schema.Depth> = {
	molecule: uranio.schema.Molecule<A,D>
}

export default Vue.extend<Data, Methods, Computed, Props<uranio.schema.AtomName, uranio.schema.Depth>>({
	inject: ['molecule'],
	data():Data {
		const message = '';
		return {
			message,
		};
	},
	methods: {
		submit_bulk_edit():void{
			this.$emit('submit', this.$store.state.modal_edit.selected_atom_ids);
			this.$store.dispatch('modal_edit/close_modal');
		},
		close():void{
			this.$store.dispatch('modal_edit/close_modal');
		},
		modal_atom_bulk_edit_selected(): void{
			const atom_prop_name = this.$store.state.modal_atom.atom_prop_name;
			const selected_atoms = this.$store.getters['modal_atom/selected_atoms'];
			if(this.$store.state.modal_atom.replace){
				this.$set(this.molecule, atom_prop_name,  selected_atoms);
			}else{
				const final_atoms = merge_atoms_of_molecule_property(
					this.molecule,
					atom_prop_name,
					selected_atoms
				);
				this.$set(this.molecule, atom_prop_name,  final_atoms);
			}
		}
	}
	
});
