import Vue from 'vue';

import { urn_util, urn_response, urn_log } from "urn-lib";

import uranio from 'uranio';

import { atom_book } from "uranio-books/atom";

import { Context } from '@nuxt/types';

type Data<A extends uranio.types.AtomName> = {
	atom_name: A
	atom: uranio.types.Molecule<A>
	plural: string
	back_label: string
	message: string
	success: boolean
	title: string
	error_object:urn_response.Fail<any>
	data_object:urn_response.General<any, any>
}

type Methods<A extends uranio.types.AtomName> = {
	modalAtomSelected: (id: string | string[]) => void
	submit: (event:Event) => Promise<void>
	submit_exit: (event:Event) => Promise<void>
	fail: (trx_response:urn_response.Fail<any>) => void
	exit: () => void
	assign_atom: (atom:uranio.types.Atom<A>) => void
	update: () => Promise<urn_response.General<uranio.types.Atom<A>, any>>
	external_submit: (event:Event) => void
	delete_atom: () => Promise<void>
}

type Computed = {
}

type Props = {
}

export default Vue.extend<Data<uranio.types.AtomName>, Methods<uranio.types.AtomName>, Computed, Props>({
	
	head: {
		bodyAttrs: {
			class: 'urn-single-page'
		}
	},
	
	layout(): string {
		return "urn-admin";
	},
	
	provide():any{
		return {
			atom: (this as any).atom,
			atom_name: (this as any).atom_name
		};
	},
	
	async asyncData<A extends uranio.types.AtomName>(context: Context)
			:Promise<Data<A>> {
		
		urn_log.debug('AsyncData.context.params: ', context.params);
		
		const atom_name = context.params.atom as A;
		
		// TODO Validate atom_name
		
		const atom_id = context.params.slug;
		
		let plural = atom_name + "s";
		
		let back_label = `back to ${plural}`;
		
		let message = "";
		
		let success = false;
		
		let atom = {} as uranio.types.Atom<A>;
		
		let data_object = {} as urn_response.General<any, any>;
		
		let title = 'No title';
		
		if (urn_util.object.has_key(atom_book, atom_name)) {
			
			const atom_def = atom_book[atom_name];
			const atom_def_props = atom_def.properties as uranio.types.Book.Definition.Properties;
			
			if(urn_util.object.has_key(atom_def, "plural")){
				plural = (atom_def as any).plural;
				back_label = `back to ${plural}`;
			}
			if(context?.from?.params?.slug !== atom_name){
				back_label = 'back';
			}
			
			const trx_base = uranio.trx.base.create(atom_name);
			
			const trx_hook = trx_base.hook('find_id');
			const hook_params = {
				params:{
					id: atom_id
				}
			} as uranio.types.Hook.Params<A, uranio.types.RouteName<A>>;
			
			const trx_response = await trx_hook(hook_params);
			data_object = trx_response;
			
			urn_log.debug('[find_id] TRX Response: ', trx_response);
			
			success = trx_response.success;
			
			if (trx_response.status == 200) {
				
				atom = trx_response.payload;
				
				title = atom._id;
				
				for(const [prop_name, prop_def] of Object.entries(atom_def_props)){
					const prop_value = atom[prop_name as keyof uranio.types.Atom<A>];
					if(prop_def.is_title === true && typeof prop_value === 'string' && prop_value !== ''){
						title = prop_value;
					}
				}
				
			} else {
				
				message = (trx_response as urn_response.Fail<any>).err_msg || "ERROR";
				
			}
			
		} else {
			
			context.error({ statusCode: 404, message: "Page not found" });
			
		}
		
		const error_object = {} as urn_response.Fail<any>;
		
		return {
			atom_name,
			atom,
			plural,
			message,
			success,
			title,
			back_label,
			error_object,
			data_object
		};
		
	},
	
	methods: {
		
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
				const old_ids = (this.atom as any)[atom_prop_name] as Array<string>;
				const new_ids = [...new Set([...old_ids ,...ids])]; // Remove duplicates
				this.$set(this.atom, atom_prop_name,  new_ids);
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
			
		},
		
		external_submit(_event: Event):void{
			if(this.$refs.atom_form && (this.$refs.atom_form as any).submit){
				(this.$refs as any).atom_form.submit();
			}
		},
		
		async update<A extends uranio.types.AtomName>()
				:Promise<urn_response.General<uranio.types.Atom<A>, any>> {
			
			const cloned_atom = _clean_atom(this.atom_name, this.atom);
			const trx_base = uranio.trx.base.create<A>(this.atom_name as A);
			const trx_hook = trx_base.hook('update');
			const hook_params = {
				params:{
					id: cloned_atom._id
				},
				body: cloned_atom
			} as uranio.types.Hook.Params<A, uranio.types.RouteName<A>>;
			
			const trx_response = await trx_hook(hook_params);
			urn_log.debug('[update] TRX Response: ', trx_response);
			
			return trx_response;
			
		},
		
		async submit(_event: Event)
				:Promise<void> {
			const trx_response = await this.update();
			if(trx_response.success){
				this.assign_atom(trx_response.payload);
			}else{
				this.fail(trx_response);
			}
		},
		
		async submit_exit(_event: Event):Promise<void> {
			const trx_response = await this.update();
			if(trx_response.success){
				this.assign_atom(trx_response.payload);
				this.exit();
			}else{
				this.fail(trx_response);
			}
		},
		
		assign_atom<A extends uranio.types.AtomName>(atom:uranio.types.Atom<A>):void{
			for(const [key, value] of Object.entries(atom)){
				this.$set(this.atom, key, value);
			}
		},
		
		fail(trx_response:urn_response.Fail<any>):void{
			urn_log.error('ERR MSG: ', trx_response.err_msg);
			this.success = false;
			this.message = trx_response.message || 'Unknown error';
			const cloned_error = { ...trx_response };
			delete cloned_error.ex;
			this.error_object = cloned_error;
		},
		
		exit():void{
			this.$router.back();
			// this.$router.push({
			//   name: 'urn-admin-slug',
			//   params: {
			//     slug: this.atom_name
			//   }
			// });
		},
		
		async delete_atom<A extends uranio.types.AtomName>()
				:Promise<void>{
			
			const trx_base = uranio.trx.base.create<A>(this.atom_name as A);
			const trx_hook = trx_base.hook('delete');
			const hook_params = {
				params:{
					id: this.atom._id
				}
			} as uranio.types.Hook.Params<A, uranio.types.RouteName<A>>;
			const trx_response = await trx_hook(hook_params);
			
			urn_log.debug('TRX Response: ', trx_response);
			
			if(trx_response.success){
				
				this.exit();
				
			}else{
				
				this.fail(trx_response);
				
			}
		}
	},
});

function _clean_atom<A extends uranio.types.AtomName>(atom_name:A, atom:uranio.types.Atom<A>)
		:uranio.types.Atom<A>{
	const cloned_atom = {...atom} as any;
	if(cloned_atom._date){
		delete cloned_atom._date;
	}
	const atom_prop_defs = atom_book[atom_name].properties;
	for(const [prop_key, prop_def] of Object.entries(atom_prop_defs)){
		if(prop_def.optional && cloned_atom[prop_key] === ''){
			delete cloned_atom[prop_key];
		}
	}
	return cloned_atom;
}
