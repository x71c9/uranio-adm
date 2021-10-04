
import Vue from 'vue';

import uranio from 'uranio';

import { atom_book } from "uranio-books/atom";

type Provide = {
	atom: uranio.types.Atom<uranio.types.AtomName>,
	atom_name: uranio.types.AtomName
}

type Data = {
	atom: uranio.types.Atom<uranio.types.AtomName>,
	atom_name: uranio.types.AtomName,
	message: string
}

type Methods = {
	submit: (event:Event) => Promise<void>
	modalAtomSelected: (id: string | string[]) => void
}

type Props = {
	atom: uranio.types.Atom<uranio.types.AtomName>
	atom_name: uranio.types.AtomName
	message: string
}

function _process_atom<A extends uranio.types.AtomName>(
	atom_name: A,
	partial_atom:Partial<uranio.types.AtomShape<A>>
):Partial<uranio.types.AtomShape<A>>{
	let cloned_atom = {...partial_atom};
	cloned_atom = uranio.core.atm.util.delete_undefined_optional(atom_name, partial_atom);
	uranio.core.atm.validate.atom_partial(atom_name, cloned_atom);
	return cloned_atom;
}

export default Vue.extend<Data, Methods, Props, Props>({
	
	layout: "urn-admin",
	
	provide():Provide{
		return {
			atom: this.atom,
			atom_name: this.atom_name
		};
	},
	
	data():Data {
		
		const message = '';
		
		const atom_name = this.$route.params.atom as uranio.types.AtomName;
		
		const atom_def = atom_book[atom_name] as uranio.types.Book.BasicDefinition;
		
		const atom_props = atom_def.properties;
		
		let atom = {} as uranio.types.Atom<typeof atom_name>;
		
		for(const key in atom_props){
			
			const prop = atom_props[key];
			switch(prop.type){
				case uranio.types.BookPropertyType.ATOM:{
					atom = {...atom, ...{[key] : null}};
					break;
				}
				case uranio.types.BookPropertyType.BINARY:{
					atom = {...atom, ...{[key] : false}};
					break;
				}
				case uranio.types.BookPropertyType.FLOAT:{
					atom = {...atom, ...{[key] : .0}};
					break;
				}
				case uranio.types.BookPropertyType.ENUM_NUMBER:
				case uranio.types.BookPropertyType.INTEGER:{
					atom = {...atom, ...{[key] : 0}};
					break;
				}
				case uranio.types.BookPropertyType.SET_NUMBER:
				case uranio.types.BookPropertyType.SET_STRING:
				case uranio.types.BookPropertyType.ATOM_ARRAY:{
					atom = {...atom, ...{[key] : []}};
					break;
				}
				default:{
					atom = {...atom, ...{[key] : ''}};
					break;
				}
			}
		}
		return {
			atom,
			atom_name,
			message
		};
	},
	
	methods: {
		
		async submit(event: Event)
				:Promise<void> {
			
			console.log('EVENT:', event);
			console.log('ATOM: ', this.atom);
			
			const trx_base = uranio.trx.base.create(this.atom_name);
			
			const cloned_atom = _process_atom(this.atom_name, this.atom);
			
			const trx_hook = trx_base.hook("insert");
			const trx_response = await trx_hook({ body: cloned_atom });
			
			console.log('TRX Response: ', trx_response);
			
			if(trx_response.success && !Array.isArray(trx_response.payload)){
				
				this.$router.push({
					
					name: 'urn-admin-atom-slug',
					params: {
						atom: this.atom_name,
						slug: trx_response.payload._id
					}
				});
				
			}else{
				
				this.$set(this, 'message', trx_response.message || '');
				console.error('ERRMSG: ', trx_response.message);
				
			}
		},
		
		modalAtomSelected()
				:void{
			
			const atom_prop_name = this.$store.state.modalAtom.atom_prop_name;
			
			const sel_atoms = this.$store.state.modalAtom.selected_atoms;
			
			if(this.$store.state.modalAtom.multiple){
				const ids = [];
				for(const [id, is_selected] of Object.entries(sel_atoms)){
					if(is_selected){
						ids.push(id);
					}
				}
				this.$set(this.atom, atom_prop_name,  ids);
			}else{
				let sid = undefined;
				for(const [id, is_selected] of Object.entries(sel_atoms)){
					if(is_selected){
						sid = id;
						break;
					}
				}
				if(sid){
					this.$set(this.atom, atom_prop_name,  sid);
				}
			}
		}
	},
});
