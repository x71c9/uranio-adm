import Vue from 'vue';

import { urn_util, urn_response, urn_log } from "uranio-utils";

import uranio from 'uranio/client';

import { merge_atoms_of_molecule_property, clean_atom } from '../../../utils/index';

import { Context } from '@nuxt/types';

import { Notification } from '../../../store/notification';

type Data<A extends uranio.schema.AtomName> = {
	atom_name: A
	molecule: uranio.schema.Molecule<A,1>
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
	modal_atom_selected: (id: string | string[]) => void
	submit: (event:Event) => Promise<void>
	submit_exit: (event:Event) => Promise<void>
	fail: (trx_response:urn_response.Fail<any>) => void
	exit: () => void
	assign_molecule: <D extends uranio.schema.Depth>(
		molecule:uranio.schema.Molecule<A,D>
	) => void
	update: <D extends uranio.schema.Depth>() =>
		Promise<urn_response.General<uranio.schema.Molecule<A,D>>>
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
			molecule: (this as any).molecule,
			atom_name: (this as any).atom_name
		};
	},
	
	async asyncData<A extends uranio.schema.AtomName>(context: Context)
			:Promise<Data<A>> {
		
		urn_log.debug('AsyncData.context.params: ', context.params);
		
		const atom_name = context.params.atom as A;
		
		if(!uranio.book.validate_name(atom_name)){
			urn_log.error(`Invalid context param slug.`);
			context.error({ statusCode: 404, message: "Page not found" });
		}
		
		const atom_id = context.params.slug;
		const plural = atom_name + "s";
		let is_read_only = false;
		let back_label = `back to ${plural}`;
		let message = "";
		let success = false;
		let molecule = {} as uranio.schema.Molecule<A,1>;
		let data_object = {} as urn_response.General<any, any>;
		let title = '[NO TITLE]';
		let error_object = {} as urn_response.Fail<any>;
		
		if(uranio.book.validate_name(atom_name)) {
			
			const atom_def = uranio.book.get_definition(atom_name);
			const prop_defs = uranio.book.get_custom_properties_definition(atom_name);
			if(urn_util.object.has_key(atom_def, "plural")){
				back_label = `back to ${atom_def.plural}`;
			}
			if(context?.from?.params?.slug !== atom_name){
				back_label = 'back';
			}
			if(
				urn_util.object.has_key(atom_def, 'read_only')
				&& atom_def.read_only === true
			){
				is_read_only = true;
			}
			const trx_base = uranio.trx.base.create(atom_name);
			const trx_hook = trx_base.hook<'find_id', 1>('find_id');
			const hook_params = {
				params:{
					id: atom_id
				},
				query: {
					options: {
						depth: 1
					}
				}
			} as unknown as uranio.types.Hook.Arguments<A, 'find_id', 1>;
			
			const trx_response = await trx_hook(hook_params);
			data_object = urn_util.object.deep_clone(trx_response);
			urn_log.debug('[find_id] TRX Response: ', trx_response);
			success = trx_response.success;
			
			if(trx_response.success === true){
				molecule = trx_response.payload;
				title = molecule._id;
				for(const [prop_name, prop_def] of Object.entries(prop_defs)){
					const prop_value = molecule[
						prop_name as keyof uranio.schema.Molecule<A,1>
					];
					if(
						(prop_def as any).is_title === true
						&& typeof prop_value === 'string'
						&& prop_value !== ''
					){
						title = prop_value;
					}
				}
			}else{
				message = (trx_response as urn_response.Fail<any>).err_msg || "ERROR";
				error_object = trx_response;
			}
			
		}else{
			
			context.error({ statusCode: 404, message: "Page not found" });
			
		}
		
		const previous_url = '';
		
		return {
			atom_name,
			molecule,
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
		
		modal_atom_selected()
				:void{
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
		
		async update<A extends uranio.schema.AtomName, D extends uranio.schema.Depth>()
				:Promise<urn_response.General<uranio.schema.Molecule<A,D>, any>> {
			let cloned_atom = urn_util.object.deep_clone(this.molecule);
			cloned_atom = uranio.core.atom.util.molecule_to_atom(this.atom_name, cloned_atom);
			cloned_atom = clean_atom(this.atom_name, cloned_atom);
			urn_log.debug('Updating atom');
			urn_log.debug(cloned_atom);
			const trx_base = uranio.trx.base.create<A>(
				this.atom_name as A,
			);
			const trx_hook = trx_base.hook<'update', D>('update');
			const hook_params = {
				params:{
					id: cloned_atom._id
				},
				query:{
					options:{
						depth: 1
					}
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
			urn_log.debug(`_slug submit`);
			const trx_response = await this.update();
			if(trx_response.success){
				this.assign_molecule(trx_response.payload);
				this.$store.dispatch('notification/show_notification', {
					type: Notification.SUCCESS,
					message: `${this.atom_name} updated.`,
				});
			}else{
				this.fail(trx_response);
			}
		},
		
		async submit_exit(_event: Event):Promise<void> {
			urn_log.debug(`_slug submit and exit`);
			const trx_response = await this.update();
			if(trx_response.success){
				this.assign_molecule(trx_response.payload);
				this.$store.dispatch('notification/show_notification', {
					type: Notification.SUCCESS,
					message: `${this.atom_name} updated.`,
				});
				this.exit();
			}else{
				this.fail(trx_response);
			}
		},
		
		assign_molecule<A extends uranio.schema.AtomName, D extends uranio.schema.Depth>(
			molecule:uranio.schema.Molecule<A,D>
		):void{
			for(const [key, value] of Object.entries(molecule)){
				this.$set(this.molecule, key, value);
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
		},
		
		async delete_atom<A extends uranio.schema.AtomName>()
				:Promise<void>{
			const trx_base = uranio.trx.base.create<A>(
				this.atom_name as A,
			);
			const trx_hook = trx_base.hook('delete');
			const hook_params = {
				params:{
					id: this.molecule._id
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
