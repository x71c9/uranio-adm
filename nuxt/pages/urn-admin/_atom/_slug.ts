import Vue from 'vue';

import { urn_util, urn_response } from "urn-lib";

import uranio from 'uranio';

import { atom_book } from "uranio-books/atom";

import {Context} from '@nuxt/types';

export type AtomProp = {
	name: string
	optional: boolean
	error: boolean
	style: uranio.types.Book.Definition.Property.PropertyStyle
}

type AtomProps = {
	[k:string]: AtomProp
}

type Data<A extends uranio.types.AtomName> = {
	atom_name: A
	plural: string
	atom: uranio.types.Molecule<A>
	atom_props: AtomProps
	message: string
	success: boolean
	title: string
}

type Methods = {
	modalAtomSelected: (id: string | string[]) => void
	submit: (event:Event) => Promise<void>
	delete_atom: () => Promise<void>
	on_change: (prop_name:keyof uranio.types.Molecule<uranio.types.AtomName>) => void
	on_keyup: (prop_name:keyof uranio.types.Molecule<uranio.types.AtomName>) => void
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
		
		// TODO Validate atom_name
		
		const atom_id = context.params.slug;
		
		let plural = atom_name + "s";
		
		let message = "";
		
		let success = false;
		
		let atom = {} as uranio.types.Atom<A>;
		
		let title = 'No title';
		
		const atom_props:AtomProps = {};
		
		if (urn_util.object.has_key(atom_book, atom_name)) {
			
			const atom_def = atom_book[atom_name];
			const atom_def_props = atom_def.properties as uranio.types.Book.Definition.Properties;
			
			for(const [prop_name, prop_def] of Object.entries(atom_def_props)){
				if(!prop_def.hidden){
					atom_props[prop_name] = {
						name: prop_name,
						style: fill_style(prop_def.style),
						optional: prop_def.optional || false,
						error: false
					};
				}
			}
			for(const [prop_name, prop_def] of Object.entries(uranio.core.stc.atom_hard_properties)){
				if(!(prop_def as any).hidden){
					atom_props[prop_name] = {
						name: prop_name,
						style: fill_style(),
						optional: false,
						error: false
					};
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
		
		on_change(prop_name:keyof uranio.types.Molecule<uranio.types.AtomName>)
				:void{
			const atom_value = this.atom[prop_name];
			const prop = this.atom_props[prop_name];
			if(prop.error === true && atom_value){
				prop.error = false;
			}else if(prop.error === false && !atom_value){
				prop.error = true;
			}
		},
		
		on_keyup(prop_name:keyof uranio.types.Molecule<uranio.types.AtomName>)
				:void{
			this.on_change(prop_name);
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
		
		async submit<A extends uranio.types.AtomName>(_event: Event):Promise<void> {
			
			// console.log('EVENT:', _event);
			
			// console.log('Atom: ', this.atom);
			
			const trx_base = uranio.trx.base.create(this.atom_name);
			
			const cloned_atom = _clean_atom(this.atom_name, this.atom);
			// const cloned_atom = _clean_atom(this.atom);
			
			const empty_required_keys = _empty_required_properties(
				this.atom_name,
				this.atom
			);
			
			for(const [key, _value] of Object.entries(this.atom_props)){
				Vue.set(this.atom_props[key], 'error', false);
			}
			
			if(empty_required_keys.length > 0){
				
				for(let i = 0; i < empty_required_keys.length; i++){
					Vue.set(this.atom_props[empty_required_keys[i]], 'error', true);
				}
				
			}else{
				
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

function _empty_required_properties<A extends uranio.types.AtomName>(atom_name: A, atom:uranio.types.Atom<A>)
		:(keyof uranio.types.Book.Definition<A>)[]{
	const atom_prop_defs = atom_book[atom_name].properties;
	const empty_required_keys:(keyof uranio.types.Book.Definition<A>)[] = [];
	for(const [prop_key, prop_def] of Object.entries(atom_prop_defs)){
		const k = prop_key as keyof typeof atom;
		if((!prop_def.optional || prop_def.optional === false) && !atom[k]){
			empty_required_keys.push(k as keyof uranio.types.Book.Definition<A>);
		}
	}
	return empty_required_keys;
}

// function _clean_atom<A extends uranio.types.AtomName>(atom:uranio.types.Atom<A>)
function _clean_atom<A extends uranio.types.AtomName>(atom_name:A, atom:uranio.types.Atom<A>)
		:uranio.types.Atom<A>{
	const cloned_atom = {...atom} as any;
	if(cloned_atom._date){
		delete cloned_atom._date;
	}
	const atom_prop_defs = atom_book[atom_name].properties;
	for(const [prop_key, prop_def] of Object.entries(atom_prop_defs)){
		if(prop_def.optional && cloned_atom[prop_key] === '' ){
			delete cloned_atom[prop_key];
		}
	}
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
