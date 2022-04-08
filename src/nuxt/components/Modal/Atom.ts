import Vue from 'vue';

import uranio from 'uranio/client';

type Data = {
};

type Methods = {
	submit: () => void
	select: (atom_id:string) => void;
	close: () => void;
};

type Computed = {
	atoms: uranio.schema.Atom<uranio.schema.AtomName>[]
	message: string
};

type Props = {
};

export default Vue.extend<Data, Methods, Computed, Props>({
	
	data():any {
		const atoms:uranio.schema.Atom<uranio.schema.AtomName>[] = [];
		const message = '';
		return {
			atoms,
			message
		};
	},
	// computed: {
	//   atoms():Promise<uranio.schema.Atom<uranio.schema.AtomName>[]>{
	//     return await this.get_atoms();
	//   },
	//   message():string{
	//     return this.message;
	//   }
	// },
	methods: {
		// async get_atoms<A extends uranio.schema.AtomName>()
		//       :Promise<uranio.schema.Atom<any>[]>{
		//   urn_log.debug('GET_ATOMS');
		//   const atom_name = this.$store.state.modal_atom.atom_prop_atom;
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
