import Vue from 'vue';

import uranio from 'uranio';

type Data = {
};

type Methods = {
	submit: () => void
	select: (atom_id:string) => void;
	close: () => void;
};

type Computed = {
	atoms: uranio.types.Atom<uranio.types.AtomName>[]
	message: string
};

type Props = {
};

export default Vue.extend<Data, Methods, Computed, Props>({
	
	data():any {
		const atoms:uranio.types.Atom<uranio.types.AtomName>[] = [];
		const message = '';
		return {
			atoms,
			message
		};
	},
	// computed: {
	//   atoms():Promise<uranio.types.Atom<uranio.types.AtomName>[]>{
	//     return await this.get_atoms();
	//   },
	//   message():string{
	//     return this.message;
	//   }
	// },
	methods: {
		// async get_atoms<A extends uranio.types.AtomName>()
		//       :Promise<uranio.types.Atom<any>[]>{
		//   console.log('GET_ATOMS');
		//   const atom_name = this.$store.state.modalAtom.atom_prop_atom;
		//   const trx_base = uranio.base.create(atom_name);
		//   const trx_response = await trx_base.hook(
		//     "find" as uranio.types.RouteName<A>
		//   )({});
		//   if(trx_response.success && Array.isArray(trx_response.payload)){
		//     return this.atoms = trx_response.payload;
		//   }else{
		//     this.message = trx_response.message || 'ERROR';
		//   }
		//   return [];
		// },
		submit():void{
			this.$emit("atom_selected");
			this.$store.dispatch('modalAtom/close_modal');
			this.$store.dispatch('modalAtom/reset_atoms');
		},
		select(atom_id:string):void{
			this.$store.dispatch('modalAtom/select_atom', atom_id);
		},
		close():void{
			this.$store.dispatch('modalAtom/close_modal');
		}
	}
	
});
