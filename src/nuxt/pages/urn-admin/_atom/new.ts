
import Vue from 'vue';

import { urn_util, urn_log, urn_response } from "urn-lib";

import uranio from 'uranio/client';

import { Notification } from '../../../store/notification';

// import { atom_book } from "uranio-books/atom";

type Provide = {
	molecule: uranio.schema.Molecule<uranio.schema.AtomName, uranio.schema.Depth>,
	atom_name: uranio.schema.AtomName
}

type Data = {
	molecule: uranio.schema.Molecule<uranio.schema.AtomName, uranio.schema.Depth>
	atom_name: uranio.schema.AtomName
	plural: string
	message: string
	success: boolean
	error_object:urn_response.Fail<any>
}

type Methods = {
	submit: (event:Event) => Promise<void>
	submit_exit: (event:Event) => Promise<void>
	external_submit: (event:Event) => void
	modalAtomSelected: (id: string | string[]) => void
	fail: (trx_response:urn_response.Fail<any>) => void
	exit: () => void
	go_back: () => void
}

type Props = {
	molecule: uranio.schema.Molecule<uranio.schema.AtomName, uranio.schema.Depth>
	atom_name: uranio.schema.AtomName
}

// function _process_atom<A extends uranio.schema.AtomName>(
//   atom_name: A,
//   partial_atom:Partial<uranio.schema.AtomShape<A>>
// ):Partial<uranio.schema.AtomShape<A>>{
//   let cloned_atom = {...partial_atom};
//   cloned_atom = uranio.atom.util.delete_undefined_optional(atom_name, partial_atom);
//   uranio.atom.validate.atom_partial(atom_name, cloned_atom);
//   return cloned_atom;
// }

function _process_atom<A extends uranio.schema.AtomName>(
	atom_name: A,
	partial_atom:uranio.schema.AtomShape<A>
):uranio.schema.AtomShape<A>{
	let cloned_atom = {...partial_atom};
	cloned_atom = uranio.core.atom.util.delete_undefined_optional(atom_name, partial_atom);
	uranio.core.atom.validate.atom_shape(atom_name, cloned_atom);
	return cloned_atom;
}

export default Vue.extend<Data, Methods, Props, Props>({
	
	layout: "urn-admin",
	
	provide():Provide{
		return {
			molecule: this.molecule,
			atom_name: this.atom_name
		};
	},
	
	data():Data {
		
		const message = '';
		
		const atom_name = this.$route.params.atom as uranio.schema.AtomName;
		
		const atom_def = uranio.book.get_definition(atom_name);
		
		let plural = atom_name + "s";
		
		if(urn_util.object.has_key(atom_def, "plural")){
			plural = (atom_def as any).plural;
		}
			
		let molecule = {} as uranio.schema.Molecule<typeof atom_name>;
		
		for(const key in atom_def.properties){
			
			const prop = atom_def.properties[key];
			switch(prop.type){
				case uranio.types.PropertyType.ATOM:{
					molecule = {...molecule, ...{[key] : null}};
					break;
				}
				case uranio.types.PropertyType.BINARY:{
					molecule = {...molecule, ...{[key] : false}};
					break;
				}
				case uranio.types.PropertyType.FLOAT:{
					molecule = {...molecule, ...{[key] : .0}};
					break;
				}
				case uranio.types.PropertyType.ENUM_NUMBER:
				case uranio.types.PropertyType.INTEGER:{
					molecule = {...molecule, ...{[key] : 0}};
					break;
				}
				case uranio.types.PropertyType.SET_NUMBER:
				case uranio.types.PropertyType.SET_STRING:
				case uranio.types.PropertyType.ATOM_ARRAY:{
					molecule = {...molecule, ...{[key] : []}};
					break;
				}
				default:{
					molecule = {...molecule, ...{[key] : ''}};
					break;
				}
			}
		}
		
		const error_object = {} as urn_response.Fail<any>;
		const success = true;
		
		return {
			molecule,
			atom_name,
			message,
			plural,
			error_object,
			success
		};
	},
	
	methods: {
		
		external_submit(_event: Event):void{
			if(this.$refs.atom_form && (this.$refs.atom_form as any).submit){
				(this.$refs as any).atom_form.submit();
			}
		},
		
		go_back():void{
			this.$router.back();
		},
		
		async submit(_event: Event)
				:Promise<void> {
			
			const trx_base = uranio.trx.base.create(this.atom_name, this.$store.state.auth.token);
			
			const atom_from_molecule = uranio.core.atom.util.molecule_to_atom(this.atom_name, this.molecule);
			const cloned_atom = _process_atom(this.atom_name, atom_from_molecule);
			
			const trx_hook = trx_base.hook('insert');
			const trx_response = await trx_hook({ body: cloned_atom });
			
			urn_log.debug('[insert] TRX Response: ', trx_response);
			
			if(trx_response.success){
				
				this.$router.push({
					name: 'urn-admin-atom-slug',
					params: {
						atom: this.atom_name,
						slug: trx_response.payload._id
					}
				});
				
			}else{
				
				this.fail(trx_response);
				
			}
		},
		
		async submit_exit(_event: Event):Promise<void>{
			await this.submit(_event);
			this.exit();
		},
		
		exit():void{
			// this.go_back();
			this.$router.push({
				name: 'urn-admin-slug',
				params: {
					slug: this.atom_name
				}
			});
		},
		
		fail(trx_response:urn_response.Fail<any>):void{
			window.scrollTo(0, 0);
			urn_log.error('ERR MSG: ', trx_response.err_msg);
			this.success = false;
			this.message = trx_response.message || 'Unknown error';
			const cloned_error = { ...trx_response };
			delete cloned_error.ex;
			this.error_object = cloned_error;
			
			this.$store.dispatch('notification/show_notification', {
				type: Notification.ERROR,
				message: this.message,
			});
		},
		
		modalAtomSelected()
				:void{
			
			const atom_prop_name = this.$store.state.modal_atom.atom_prop_name;
			
			const sel_atoms = this.$store.state.modal_atom.selected_atoms;
			
			if(this.$store.state.modal_atom.multiple){
				const ids = [];
				for(const [id, is_selected] of Object.entries(sel_atoms)){
					if(is_selected){
						ids.push(id);
					}
				}
				this.$set(this.molecule, atom_prop_name,  ids);
			}else{
				let sid = undefined;
				for(const [id, is_selected] of Object.entries(sel_atoms)){
					if(is_selected){
						sid = id;
						break;
					}
				}
				if(sid){
					this.$set(this.molecule, atom_prop_name,  sid);
				}
			}
		}
	},
});
