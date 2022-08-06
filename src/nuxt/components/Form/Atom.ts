import Vue from 'vue';

import {urn_util, urn_log, urn_exception} from "urn-lib";

import uranio from 'uranio/client';

export enum PropState {
	VALID = 'VALID',
	WARNING = 'WARNING',
	ERROR = 'ERROR'
}
export enum Call {
	INSERT = 'INSERT',
	UPDATE = 'UPDATE',
	BULK_EDIT = 'BULK_EDIT'
}
export type UIAtomProp = {
	name: string
	optional: boolean
	state: PropState
	focus: boolean
	style: uranio.types.Book.Definition.Property.AdminStyle
	error_message: string
}
type UIAtomProps = {
	[k:string]: UIAtomProp
}
type Data = {
	atom_props: UIAtomProps
	error_class: boolean
}
type Methods = {
	submit: (event:Event) => void
	submit_exit: (event:Event) => void
	delete_atom: (event:Event) => void
	go_back: (event:Event) => void
	validate_property: (prop_name:keyof uranio.schema.Molecule<uranio.schema.AtomName>) => boolean
	validate_form: () => boolean
	error: () => void
	focus: (prop_name:string) => void
	on_change: (prop_name:keyof uranio.schema.Molecule<uranio.schema.AtomName>) => void
	on_keyup: (prop_name:keyof uranio.schema.Molecule<uranio.schema.AtomName>) => void
}

type Computed<A extends uranio.schema.AtomName> = {
	atom_from_molecule: uranio.schema.Atom<A>
}

type Props<A extends uranio.schema.AtomName> = {
	molecule: uranio.schema.Molecule<A>
	atom_name: A
	call: Call
}
export default Vue.extend<Data, Methods, Computed<uranio.schema.AtomName>, Props<uranio.schema.AtomName>>({
	
	props: {
		molecule: Object,
		atom_name: Object,
		call: String as () => Call
	},
	
	inject:[
		'molecule',
		'atom_name'
	],
	
	computed: {
		atom_from_molecule(){
			const cloned = urn_util.object.deep_clone(this.molecule);
			const atom = uranio.core.atom.util.molecule_to_atom(this.atom_name, cloned);
			return atom;
		}
	},
	
	data():Data{
		
		const atom_props:UIAtomProps = {};
		
		if (uranio.book.validate_name(this.atom_name)) {
			
			const prop_defs = uranio.book.get_custom_properties_definition(this.atom_name);
			
			for(const [prop_name, prop_def] of Object.entries(prop_defs)){
				if(this.call === Call.BULK_EDIT && prop_def.unique){
					continue;
				}
				if(this.call === Call.UPDATE && prop_def.hidden){
					continue;
				}
				atom_props[prop_name] = {
					name: prop_name,
					style: _fill_style((prop_def as any).style),
					optional: prop_def.optional || false,
					state: PropState.VALID,
					error_message: '',
					focus: false
				};
			}
			if(this.call === Call.UPDATE){
				for(const [prop_name, prop_def] of Object.entries(uranio.core.stc.atom_hard_properties)){
					if(!(prop_def as any).hidden){
						atom_props[prop_name] = {
							name: prop_name,
							style: _fill_style(),
							optional: false,
							state: PropState.VALID,
							error_message: '',
							focus: false
						};
					}
				}
			}
		}
		
		return {
			atom_props,
			error_class: false
		};
		
	},
	
	methods: {
		
		on_change(prop_name:keyof uranio.schema.Molecule<uranio.schema.AtomName>)
				:void{
			this.validate_property(prop_name);
		},
		
		on_keyup(prop_name:keyof uranio.schema.Molecule<uranio.schema.AtomName>)
				:void{
			this.on_change(prop_name);
		},
		
		submit(_event: Event):void {
			
			urn_log.trace(`submitting form`);
			
			if(this.validate_form()){
				this.$emit('submit_atom_form');
			}else{
				this.error();
			}
		},
		
		submit_exit(_event:Event):void{
			
			urn_log.trace(`submitting form and exit`);
			
			if(this.validate_form()){
				this.$emit('submit_exit_atom_form');
			}else{
				this.error();
			}
		},
		
		delete_atom(_event:Event):void{
			
			urn_log.trace(`deleting atom`);
			
			this.$emit('delete_atom');
		},
		
		go_back(_event:Event):void{
			
			urn_log.trace(`going back`);
			
			this.$emit('go_back');
		},
		
		validate_property(prop_name:keyof uranio.types.Book.Definition.Properties)
				:boolean{
			if(
				this.call === Call.BULK_EDIT
				&& _is_property_empty(this.atom_name, this.molecule, prop_name)
			){
				return true;
			}
			const prop_def = uranio.book.get_property_definition(
				this.atom_name,
				prop_name
			);
			const prop_value = this.atom_from_molecule[
				prop_name as keyof uranio.schema.Atom<uranio.schema.AtomName>
			];
			const prop = this.atom_props[prop_name];
			if(
				_is_property_required(this.atom_name, prop_name)
				&& _is_property_empty(this.atom_name, this.molecule, prop_name)
			){
				prop.state = PropState.ERROR;
				prop.error_message = 'This field is required.';
				return false;
			}
			try{
				uranio.core.atom.validate.property(
					prop_name as keyof uranio.schema.Atom<uranio.schema.AtomName>,
					prop_def,
					prop_value,
					this.atom_from_molecule
				);
				prop.state = PropState.VALID;
				prop.error_message = '';
			}catch(e){
				const err = e as any;
				if(err.type === urn_exception.ExceptionType.INVALID_ATOM){
					prop.state = PropState.ERROR;
					prop.error_message = _format_message(err.msg);
				}else{
					urn_log.error(err);
				}
				return false;
			}
			return true;
		},
		
		validate_form():boolean{
			let is_form_valid = true;
			for(const [key, _value] of Object.entries(this.atom_props)){
				const k = key as keyof uranio.schema.Molecule<uranio.schema.AtomName>;
				if(this.validate_property(k) === false){
					is_form_valid = false;
					this.focus(k);
				}
			}
			return is_form_valid;
		},
		
		error():void{
			this.error_class = true;
			setTimeout(() => this.error_class = false, 400);
		},
		
		focus(prop_name:string):void{
			for(const [prop_name, _prop] of Object.entries(this.atom_props)){
				this.atom_props[prop_name].focus = false;
			}
			this.atom_props[prop_name].focus = true;
		}
		
	},
	
});

function _is_property_required<A extends uranio.schema.AtomName>(
	atom_name:A,
	prop_key:keyof uranio.types.Book.Definition.Properties
):boolean{
	let is_required = true;
	const prop_def = uranio.book.get_property_definition(atom_name, prop_key);
	if(prop_def.optional === true){
		is_required = false;
	}
	return is_required;
}
function _is_property_empty<A extends uranio.schema.AtomName>(
	atom_name:A,
	atom:uranio.schema.AtomShape<A>,
	prop_key:keyof uranio.types.Book.Definition.Properties
):boolean{
	let is_empty = false;
	const prop_def = uranio.book.get_property_definition(atom_name, prop_key);
	// if(!prop_def.optional && !prop_def.hidden){
	const k = prop_key as keyof typeof atom;
	if(typeof atom[k] === 'undefined'){
		is_empty = true;
	}else{
		switch(prop_def.type){
			case uranio.types.PropertyType.ATOM:{
				if(atom[k] === {} || (atom[k] as unknown) === ''){
					is_empty = true;
				}
				break;
			}
			case uranio.types.PropertyType.SET_NUMBER:
			case uranio.types.PropertyType.SET_STRING:
			case uranio.types.PropertyType.ATOM_ARRAY:{
				if((atom[k] as unknown as Array<any>).length === 0){
					is_empty = true;
				}
				break;
			}
			case uranio.types.PropertyType.BINARY:{
				if(typeof atom[k] === 'undefined' || (atom as any)[k] === ''){
					is_empty = true;
				}
				break;
			}
			case uranio.types.PropertyType.TIME:
			case uranio.types.PropertyType.DAY:{
				if(!atom[k]){
					is_empty = true;
				}
				break;
			}
			case uranio.types.PropertyType.TEXT:
			case uranio.types.PropertyType.LONG_TEXT:
			case uranio.types.PropertyType.ID:
			case uranio.types.PropertyType.ENUM_STRING:
			case uranio.types.PropertyType.ENCRYPTED:
			case uranio.types.PropertyType.EMAIL:{
				if(!atom[k]){
					is_empty = true;
				}
				break;
			}
			case uranio.types.PropertyType.INTEGER:
			case uranio.types.PropertyType.FLOAT:
			case uranio.types.PropertyType.ENUM_NUMBER:{
				if(isNaN(atom[k] as unknown as number)){
					is_empty = true;
				}
				break;
			}
		}
	// }
	}
	return is_empty;
}

function _fill_style(prop_def_style?:uranio.types.Book.Definition.Property.AdminStyle)
		:uranio.types.Book.Definition.Property.AdminStyle{
	const default_style:uranio.types.Book.Definition.Property.AdminStyle = {
		full_width: false,
		classes: ''
	};
	if(typeof prop_def_style === 'undefined'){
		prop_def_style = default_style;
	}else{
		for(const [key, value] of Object.entries(default_style)){
			const k = key as keyof uranio.types.Book.Definition.Property.AdminStyle;
			if(typeof prop_def_style[k] === 'undefined'){
				(prop_def_style as any)[k] = value;
			}
		}
	}
	return prop_def_style;
}

function _format_message(str:string){
	return str.replace(/`([^`]*)`/g, '<code>$1</code>');
}

