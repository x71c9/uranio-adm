
import Vue from 'vue';

import uranio from 'uranio/client';

// import {atom_book} from 'uranio-books/atom';

type Checked = {
	[id:string]: boolean
}

type Data = {
	checked_by_id: Checked
	is_all_checked: boolean
	is_all_indeterminate: boolean
	primary_properties: string[]
	plural: string
};

type Methods = {
	toggle_all: () => void
	toggle_atom: (id:string) => void
	check_all: () => void
	check_none: () => void
	reset_check: () => void
	reload_check: () => void
	is_indeterminate: () => boolean
	edit_selected: () => void
	edit_all: () => void
	delete_selected: () => void
	delete_all: () => void
}

type Computed = {
	selected_atoms: string[]
	count_selected: number
	count_label: string
}

type Props = {
	atoms: uranio.schema.Atom<uranio.schema.AtomName>[]
	atom_name: uranio.schema.AtomName,
	is_read_only: boolean
}

export default Vue.extend<Data, Methods, Computed, Props>({
	inject: [
		'atoms',
		'atom_name',
		'is_read_only'
	],
	props: {
		atoms: Array,
		atom_name: Object,
		is_read_only: Boolean
	},
	data():Data {
		const checked_by_id = {} as Checked;
		for(let i = 0; i < this.atoms.length; i++){
			checked_by_id[this.atoms[i]._id] = false;
		}
		const is_all_checked = false;
		const is_all_indeterminate = false;
		const prop_defs = uranio.book.get_full_properties_definition(this.atom_name);
		const primary_properties:string[] = [];
		for(const [prop_key, prop_def] of Object.entries(prop_defs)){
			if(prop_def.primary === true){
				primary_properties.push(prop_key);
			}
		}
		const atom_def = uranio.book.get_definition(this.atom_name as uranio.schema.AtomName);
		const plural = atom_def.plural || this.atom_name + 's';
		return {
			checked_by_id,
			is_all_checked,
			is_all_indeterminate,
			primary_properties,
			plural
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
			return (this.count_selected > 1) ? this.plural : this.atom_name;
		}
	},
	methods: {
		edit_selected(){
			console.log(this.selected_atoms);
		},
		edit_all(){
			console.log('edit all');
		},
		delete_selected(){
			this.$emit('delete_atoms', this.selected_atoms);
		},
		delete_all(){
			this.$emit('delete_all_atoms');
		},
		reload_check(){
			const checked_by_id = {} as Checked;
			for(let i = 0; i < this.atoms.length; i++){
				checked_by_id[this.atoms[i]._id] = false;
			}
			this.checked_by_id = Object.assign({}, checked_by_id);
			console.log(this.checked_by_id);
		},
		reset_check(){
			for(const [id, _value] of Object.entries(this.checked_by_id)){
				this.$delete(this.checked_by_id, id);
			}
			this.is_all_checked = false;
			this.is_all_indeterminate = false;
		},
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
			console.log('toggle: ', this.checked_by_id);
		},
	}
});
