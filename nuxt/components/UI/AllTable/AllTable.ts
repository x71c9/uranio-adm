
import Vue from 'vue';

import uranio from 'uranio';

import {atom_book} from 'uranio-books/atom';

type Checked = {
	[id:string]: boolean
}

type Data = {
	checked_by_id: Checked
	is_all_checked: boolean
	is_all_indeterminate: boolean
};

type Methods = {
	toggle_all: () => void
	toggle_atom: (id:string) => void
	check_all: () => void
	check_none: () => void
	is_indeterminate: () => boolean
}

type Computed = {
	selected_atoms: string[]
	count_selected: number
	count_label: string
}

type Props = {
	atoms: uranio.types.Atom<uranio.types.AtomName>[]
	atom_name: uranio.types.AtomName
}

export default Vue.extend<Data, Methods, Computed, Props>({
	inject: [
		'atoms',
		'atom_name'
	],
	props: {
		atoms: Array,
		atom_name: Object
	},
	data():Data {
		const checked_by_id = {} as Checked;
		for(let i = 0; i < this.atoms.length; i++){
			checked_by_id[this.atoms[i]._id] = false;
		}
		const is_all_checked = false;
		const is_all_indeterminate = false;
		return {
			checked_by_id,
			is_all_checked,
			is_all_indeterminate,
		};
	},
	computed: {
		selected_atoms() {
			const selected_atoms:string[] = [];
			for(const id in this.checked_by_id){
				if(this.checked_by_id[id] === true){
					selected_atoms.push(id);
				}
			}
			return selected_atoms;
		},
		count_selected(){
			return this.selected_atoms.length;
		},
		count_label(){
			const atom_def = atom_book[this.atom_name as keyof typeof atom_book] as
				uranio.types.Book.BasicDefinition;
			const plural = atom_def.plural || this.atom_name + 's';
			return (this.count_selected > 1) ? plural : this.atom_name;
		}
	},
	methods: {
		toggle_all(){
			if(this.is_all_checked === false){
				this.check_all();
			}else{
				this.check_none();
			}
		},
		check_all(){
			for(let i = 0; i < this.atoms.length; i++){
				this.$set(this.checked_by_id, this.atoms[i]._id, true);
			}
			this.is_all_checked = true;
			this.is_all_indeterminate = false;
		},
		check_none(){
			for(let i = 0; i < this.atoms.length; i++){
				this.$set(this.checked_by_id, this.atoms[i]._id, false);
			}
			this.is_all_checked = false;
			this.is_all_indeterminate = false;
		},
		is_indeterminate(){
			return this.atoms.length !== this.count_selected;
		},
		toggle_atom(id:string){
			this.checked_by_id[id] = !this.checked_by_id[id];
			if(this.is_indeterminate()){
				this.is_all_indeterminate = true;
			}else{
				this.is_all_indeterminate = false;
			}
			if(this.checked_by_id[id] === true){
				this.is_all_checked = true;
			}else if(this.count_selected === 0){
				this.is_all_checked = false;
			}
		},
	}
});
