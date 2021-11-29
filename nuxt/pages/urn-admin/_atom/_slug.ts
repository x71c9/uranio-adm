import Vue from 'vue';

import { urn_util, urn_response } from "urn-lib";

import uranio from 'uranio';

import { atom_book } from "uranio-books/atom";

import {Context} from '@nuxt/types';

type AtomProp = {
	name: string
	optional: boolean
	style: uranio.types.Book.Definition.Property.PropertyStyle
}

type Data<A extends uranio.types.AtomName> = {
	atom_name: A
	plural: string
	atom: uranio.types.Molecule<A>
	atom_props: AtomProp[]
	message: string
	success: boolean
	title: string
}

type Methods = {
	modalAtomSelected: (id: string | string[]) => void
	submit: (event:Event) => Promise<void>
	delete_atom: () => Promise<void>
}

type Computed = {
	
}

type Props = {
	
}

export default Vue.extend<Data<uranio.types.AtomName>, Methods, Computed, Props>({
	
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
		
		console.log('AsyncData.context.params: ', context.params);
		
		const atom_name = context.params.atom as A;
		
		const atom_id = context.params.slug;
		
		let plural = atom_name + "s";
		
		let message = "";
		
		let success = false;
		
		let atom = {} as uranio.types.Atom<A>;
		
		let title = 'No title';
		
		const atom_props:AtomProp[] = [];
		
		if (urn_util.object.has_key(atom_book, atom_name)) {
			
			const atom_def = atom_book[atom_name];
			const atom_def_props = atom_def.properties as uranio.types.Book.Definition.Properties;
			
			for(const [prop_name, prop_def] of Object.entries(atom_def_props)){
				if(!prop_def.hidden){
					atom_props.push({
						name: prop_name,
						style: fill_style(prop_def.style),
						optional: prop_def.optional || false
					});
				}
			}
			for(const [prop_name, prop_def] of Object.entries(uranio.core.stc.atom_hard_properties)){
				if(!(prop_def as any).hidden){
					atom_props.push({
						name: prop_name,
						style: fill_style(),
						optional: false
					});
				}
			}
			
			if(urn_util.object.has_key(atom_def, "plural")){
				plural = (atom_def as any).plural;
			}
			
			const trx_base = uranio.trx.base.create(atom_name);
			
			const trx_hook = trx_base.hook('find_id');
			const hook_params = {
				params:{
					id: atom_id
				}
			} as uranio.types.Hook.Params<A, uranio.types.RouteName<A>>;
			
			const trx_response = await trx_hook(hook_params);
			
			console.log('TRX Response: ', trx_response);
			
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
		
		return {
			atom_name,
			atom,
			atom_props,
			plural,
			message,
			success,
			title
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
		
		async submit<A extends uranio.types.AtomName>(event: Event):Promise<void> {
			
			console.log('EVENT:', event);
			
			console.log('Atom: ', this.atom);
			
			const trx_base = uranio.trx.base.create(this.atom_name);
			
			// const cloned_atom = _clean_atom(this.atom_name, this.atom);
			const cloned_atom = _clean_atom(this.atom);
			
			const trx_hook = trx_base.hook('update');
			
			const hook_params = {
				params:{
					id: cloned_atom._id
				},
				body: cloned_atom
			} as uranio.types.Hook.Params<A, uranio.types.RouteName<A>>;
			
			const trx_response = await trx_hook(hook_params);
			
			console.log('TRX Response: ', trx_response);
			
			if(trx_response.success){
				
				for(const [key, value] of Object.entries(trx_response.payload)){
					this.$set(this.atom, key, value);
				}
				
			}else{
				
				this.message = trx_response.message || '';
				
				console.error('ERR MSG: ', trx_response.err_msg);
			}
		},
		
		async delete_atom<A extends uranio.types.AtomName>()
				:Promise<void>{
			
			const that = this as any;
			
			const trx_base = uranio.trx.base.create(this.atom_name);
			
			const trx_hook = trx_base.hook('delete');
			
			const hook_params = {
				params:{
					id: this.atom._id
				}
			} as uranio.types.Hook.Params<A, uranio.types.RouteName<A>>;
			
			const trx_response = await trx_hook(hook_params);
			
			console.log('TRX Response: ', trx_response);
			
			if(trx_response.success){
				
				this.$router.push({
					name: 'urn-admin-slug',
					params: {
						slug: this.atom_name
					}
				});
				
			}else{
				
				that.message = trx_response.message;
				console.error('ERR MSG: ', trx_response.err_msg);
				
			}
		}
	},
});

// function _clean_atom<A extends uranio.types.AtomName>(atom_name:A, atom:uranio.types.Atom<A>)
function _clean_atom<A extends uranio.types.AtomName>(atom:uranio.types.Atom<A>)
		:uranio.types.Atom<A>{
	const cloned_atom = {...atom} as any;
	if(cloned_atom._date){
		delete cloned_atom._date;
	}
	// const atom_prop_defs = atom_book[atom_name].properties;
	// for(const [prop_key, prop_def] of Object.entries(atom_prop_defs)){
	//   if(prop_def.optional && cloned_atom[prop_key] === '' ){
	//     delete cloned_atom[prop_key];
	//   }
	// }
	return cloned_atom;
}

export function fill_style(prop_def_style?:uranio.types.Book.Definition.Property.PropertyStyle)
		:uranio.types.Book.Definition.Property.PropertyStyle{
	
	const default_style:uranio.types.Book.Definition.Property.PropertyStyle = {
		full_width: false,
		classes: ''
	};
	
	if(typeof prop_def_style === 'undefined'){
		prop_def_style = default_style;
	}else{
		for(const [key, value] of Object.entries(default_style)){
			const k = key as keyof uranio.types.Book.Definition.Property.PropertyStyle;
			if(typeof prop_def_style[k] === 'undefined'){
				(prop_def_style as any)[k] = value;
			}
		}
	}
	
	return prop_def_style;
}
