import Vue from 'vue';

import { urn_util, urn_response, urn_log } from "urn-lib";

import uranio from 'uranio/client';

import { Context } from '@nuxt/types';

import { Notification } from '../../../store/notification';

type Data<A extends uranio.schema.AtomName> = {
	atom_name: A
	atom: uranio.schema.Molecule<A>
	plural: string
	back_label: string
	message: string
	success: boolean
	title: string
	error_object:urn_response.Fail<any>
	data_object:urn_response.General<any, any>
	previous_url: string
	is_read_only: boolean
}

type Methods<A extends uranio.schema.AtomName> = {
	modalAtomSelected: (id: string | string[]) => void
	submit: (event:Event) => Promise<void>
	submit_exit: (event:Event) => Promise<void>
	fail: (trx_response:urn_response.Fail<any>) => void
	exit: () => void
	assign_atom: (atom:uranio.schema.Atom<A>) => void
	update: () => Promise<urn_response.General<uranio.schema.Atom<A>, any>>
	external_submit: (event:Event) => void
	external_submit_exit: (event:Event) => void
	delete_atom: () => Promise<void>
	go_back: () => void
}

type Computed = Record<string, never>

type Props = Record<string, never>

export default Vue.extend<Data<uranio.schema.AtomName>, Methods<uranio.schema.AtomName>, Computed, Props>({
	
	layout(): string {
		return "urn-admin";
	},
	
	provide():any{
		return {
			atom: (this as any).atom,
			atom_name: (this as any).atom_name
		};
	},
	
	async asyncData<A extends uranio.schema.AtomName>(context: Context)
			:Promise<Data<A>> {
		
		urn_log.debug('AsyncData.context.params: ', context.params);
		
		const atom_name = context.params.atom as A;
		
		// TODO Validate atom_name
		
		const atom_id = context.params.slug;
		
		const plural = atom_name + "s";
		
		let is_read_only = false;
		
		let back_label = `back to ${plural}`;
		
		let message = "";
		
		let success = false;
		
		let atom = {} as uranio.schema.Atom<A>;
		
		let data_object = {} as urn_response.General<any, any>;
		
		let title = '[NO TITLE]';
		
		let error_object = {} as urn_response.Fail<any>;
		
		if (uranio.book.validate_name(atom_name)) {
			
			// const atom_def = atom_book[atom_name];
			// const atom_def_props = atom_def.properties as uranio.types.Book.Definition.Properties;
			const atom_def = uranio.book.get_definition(atom_name);
			const prop_defs = uranio.book.get_custom_properties_definition(atom_name);
			
			if(urn_util.object.has_key(atom_def, "plural")){
				back_label = `back to ${atom_def.plural}`;
			}
			if(context?.from?.params?.slug !== atom_name){
				back_label = 'back';
			}
			
			if(urn_util.object.has_key(atom_def, 'read_only') && atom_def.read_only === true){
				is_read_only = true;
			}
			// const trx_base = uranio.trx.base.create(atom_name, context.store.state.auth.token);
			const trx_base = uranio.trx.base.create(atom_name);
			
			const trx_hook = trx_base.hook('find_id');
			const hook_params = {
				params:{
					id: atom_id
				}
			} as uranio.types.Hook.Params<A, uranio.schema.RouteName<A>>;
			
			const trx_response = await trx_hook(hook_params);
			data_object = JSON.parse(JSON.stringify({...trx_response}));
			
			urn_log.debug('[find_id] TRX Response: ', trx_response);
			
			success = trx_response.success;
			
			if (trx_response.success === true) {
				
				atom = trx_response.payload;
				
				title = atom._id;
				
				for(const [prop_name, prop_def] of Object.entries(prop_defs)){
					const prop_value = atom[prop_name as keyof uranio.schema.Atom<A>];
					if(
						(prop_def as any).is_title === true
						&& typeof prop_value === 'string'
						&& prop_value !== ''
					){
						title = prop_value;
					}
				}
				
			} else {
				
				message = (trx_response as urn_response.Fail<any>).err_msg || "ERROR";
				error_object = trx_response;
				
			}
			
		} else {
			
			context.error({ statusCode: 404, message: "Page not found" });
			
		}
		
		const previous_url = '';
		
		return {
			atom_name,
			atom,
			plural,
			message,
			success,
			title,
			back_label,
			error_object,
			data_object,
			previous_url,
			is_read_only
		};
		
	},
	
	beforeRouteEnter (_to, from, next) {
		next(vm => {
			(vm as any).previous_url = from.path;
			next();
		});
	},
	
	methods: {
		
		go_back():void{
			const last_path = this.previous_url.split('/').slice(-1)[0];
			if(last_path === 'new'){
				this.$router.push({path: `/urn-admin/${this.atom_name}`});
				return;
			}
			this.$router.back();
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
		
		external_submit_exit(_event: Event):void{
			if(this.$refs.atom_form && (this.$refs.atom_form as any).submit){
				(this.$refs as any).atom_form.submit_exit();
			}
		},
		
		async update<A extends uranio.schema.AtomName>()
				:Promise<urn_response.General<uranio.schema.Atom<A>, any>> {
			
			const cloned_atom = _clean_atom(this.atom_name, this.atom);
			const trx_base = uranio.trx.base.create<A>(
				this.atom_name as A,
				// this.$store.state.auth.token
			);
			const a:uranio.schema.RouteName<'media'> = 'find';
			console.log(a);
			const trx_hook = trx_base.hook('update');
			const hook_params = {
				params:{
					id: cloned_atom._id
				},
				body: cloned_atom
			} as uranio.types.Hook.Params<A, uranio.schema.RouteName<A>>;
			
			const trx_response = await trx_hook(hook_params);
			urn_log.debug('[update] TRX Response: ', trx_response);
			
			if(!trx_response.success){
				this.fail(trx_response);
			}
			
			return trx_response;
			
		},
		
		async submit(_event: Event)
				:Promise<void> {
			const trx_response = await this.update();
			if(trx_response.success){
				this.assign_atom(trx_response.payload);
				
				this.$store.dispatch('notification/show_notification', {
					type: Notification.SUCCESS,
					message: `${this.atom_name} updated.`,
				});
				
			}else{
				this.fail(trx_response);
			}
		},
		
		async submit_exit(_event: Event):Promise<void> {
			const trx_response = await this.update();
			if(trx_response.success){
				this.assign_atom(trx_response.payload);
				
				this.$store.dispatch('notification/show_notification', {
					type: Notification.SUCCESS,
					message: `${this.atom_name} updated.`,
				});
				
				this.exit();
			}else{
				this.fail(trx_response);
			}
		},
		
		assign_atom<A extends uranio.schema.AtomName>(atom:uranio.schema.Atom<A>):void{
			for(const [key, value] of Object.entries(atom)){
				this.$set(this.atom, key, value);
			}
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
		
		exit():void{
			this.go_back();
			// this.$router.push({
			//   name: 'urn-admin-slug',
			//   params: {
			//     slug: this.atom_name
			//   }
			// });
		},
		
		async delete_atom<A extends uranio.schema.AtomName>()
				:Promise<void>{
			
			const trx_base = uranio.trx.base.create<A>(
				this.atom_name as A,
				// this.$store.state.auth.token
			);
			const trx_hook = trx_base.hook('delete');
			const hook_params = {
				params:{
					id: this.atom._id
				}
			} as uranio.types.Hook.Params<A, uranio.schema.RouteName<A>>;
			const trx_response = await trx_hook(hook_params);
			
			urn_log.debug('TRX Response: ', trx_response);
			
			if(trx_response.success){
				
				this.$store.dispatch('notification/show_notification', {
					type: Notification.ERROR,
					message: `${this.atom_name} deleted.`,
				});
				
				this.exit();
				
			}else{
				
				this.fail(trx_response);
				
			}
		}
	},
});

function _clean_atom<A extends uranio.schema.AtomName>(atom_name:A, atom:uranio.schema.Atom<A>)
		:uranio.schema.Atom<A>{
	const cloned_atom = {...atom} as any;
	if(cloned_atom._date){
		delete cloned_atom._date;
	}
	// const atom_prop_defs = atom_book[atom_name].properties;
	const atom_prop_defs = uranio.book.get_custom_properties_definition(atom_name);
	for(const [prop_key, prop_def] of Object.entries(atom_prop_defs)){
		if(prop_def.optional && cloned_atom[prop_key] === ''){
			delete cloned_atom[prop_key];
		}
	}
	return cloned_atom;
}
