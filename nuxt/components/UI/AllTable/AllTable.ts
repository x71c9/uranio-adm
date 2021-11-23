
import Vue from 'vue';

import uranio from 'uranio';

type Checked = {
	[id:string]: boolean
}

type Data = {
	selected_atoms: string[]
	checked: Checked
};

type Methods = {
	toggle_all: () => void
	toggle_atom: (id:string) => void
	is_checked: (id:string) => boolean
}

type Computed = {
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
		// console.log(this.atoms);
		// console.log(this.atom_name);
		const checked = {} as Checked;
		for(let i = 0; i < this.atoms.length; i++){
			checked[this.atoms[i]._id] = false;
		}
		return {
			selected_atoms: [],
			checked: checked
		};
	},
	methods: {
		toggle_all(){
			// this.selected_atoms = [];
			// for(let i = 0; i < this.atoms.length; i++){
			//   this.selected_atoms.push(this.atoms[i]._id);
			// }
			for(let i = 0; i < this.atoms.length; i++){
				this.$set(this.checked, this.atoms[i]._id, true);
			}
			console.log(this.checked);
			return;
		},
		toggle_atom(id:string){
			// const index = this.selected_atoms.indexOf(id);
			// if(index !== -1){
			//   this.selected_atoms.splice(index, 1);
			// }else{
			//   this.selected_atoms.push(id);
			// }
			// console.log(this.selected_atoms);
			this.checked[id] = !this.checked[id];
			console.log(this.checked);
			return;
		},
		is_checked(id:string){
			return this.selected_atoms.includes(id);
		}
	}
});
