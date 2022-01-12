import Vue from 'vue';

import { urn_log, urn_exception } from "urn-lib";

// const urn_exc = urn_exception.init('ADMIN_FORM_ATOM', 'Uranio admin Form Atom');

import uranio from 'uranio';

// import { atom_book } from "uranio-books/atom";

export enum PropState {
	VALID = 'VALID',
	WARNING = 'WARNING',
	ERROR = 'ERROR'
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
	validate_property: (prop_name:keyof uranio.types.Molecule<uranio.types.AtomName>) => boolean
	validate_form: () => boolean
	// custom_validate_form: () => boolean
	error: () => void
	focus: (prop_name:string) => void
	on_change: (prop_name:keyof uranio.types.Molecule<uranio.types.AtomName>) => void
	on_keyup: (prop_name:keyof uranio.types.Molecule<uranio.types.AtomName>) => void
}
type Computed = {
}
type Props<A extends uranio.types.AtomName> = {
	atom: uranio.types.Molecule<A>
	atom_name: A
	call: 'insert' | 'update'
}
export default Vue.extend<Data, Methods, Computed, Props<uranio.types.AtomName>>({
	
	props: {
		atom: Object,
		atom_name: Object,
		call: String as () => 'insert' | 'update'
	},
	
	inject:[
		'atom',
		'atom_name'
	],
	
	data():Data{
		
		const atom_props:UIAtomProps = {};
		if (uranio.book.atom.validate_name(this.atom_name)) {
			
			// const atom_def = atom_book[this.atom_name];
			// const atom_def_props = atom_def.properties as uranio.types.Book.Definition.Properties;
			
			const prop_defs = uranio.book.atom.get_custom_property_definitions(this.atom_name);
			
			for(const [prop_name, prop_def] of Object.entries(prop_defs)){
				if(!prop_def.hidden){
					atom_props[prop_name] = {
						name: prop_name,
						style: _fill_style((prop_def as any).style),
						optional: prop_def.optional || false,
						state: PropState.VALID,
						error_message: '',
						focus: false
					};
				}
			}
			if(this.call === 'update'){
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
		
		const previous_url = '';
		
		return {
			atom_props,
			error_class: false,
			previous_url
		};
		
	},
	
	methods: {
		
		on_change(prop_name:keyof uranio.types.Molecule<uranio.types.AtomName>)
				:void{
			this.validate_property(prop_name);
			// const atom_prop_defs = atom_book[this.atom_name].properties as
			//   uranio.types.Book.Definition.Properties;
			// const prop_def = atom_prop_defs[prop_name];
			// const prop_value = this.atom[prop_name];
			// const prop = this.atom_props[prop_name];
			// if(_is_property_empty(this.atom_name, this.atom, prop_name)){
			//   prop.state = 'error';
			//   prop.error_message = 'This field is required.';
			// }else{
			//   try{
			//     uranio.core.atm.validate.property(prop_name, prop_def, prop_value, this.atom);
			//     prop.state = 'valid';
			//     prop.error_message = '';
			//   }catch(e){
			//     if(e.type === urn_exception.ExceptionType.INVALID_ATOM){
			//       prop.state = 'error';
			//       prop.error_message = _format_message(e.msg);
			//     }
			//     urn_log.error(e);
			//   }
			// }
		},
		
		on_keyup(prop_name:keyof uranio.types.Molecule<uranio.types.AtomName>)
				:void{
			this.on_change(prop_name);
		},
		
		submit(_event: Event):void {
			if(this.validate_form()){
				this.$emit('submit_atom_form');
			}else{
				this.error();
			}
		},
		
		submit_exit(_event:Event):void{
			if(this.validate_form()){
				this.$emit('submit_exit_atom_form');
			}else{
				this.error();
			}
		},
		
		delete_atom(_event:Event):void{
			this.$emit('delete_atom');
		},
		
		go_back(_event:Event):void{
			this.$emit('go_back');
		},
		
		validate_property(prop_name:keyof uranio.types.Book.Definition.Properties)
				:boolean{
			const prop_def = uranio.book.atom.get_property_definition(this.atom_name, prop_name);
			const prop_value = this.atom[prop_name as keyof uranio.types.Atom<uranio.types.AtomName>];
			const prop = this.atom_props[prop_name];
			if(_is_property_empty(this.atom_name, this.atom, prop_name)){
				prop.state = PropState.ERROR;
				prop.error_message = 'This field is required.';
				return false;
			}
			try{
				uranio.core.atm.validate.property(
					prop_name as keyof uranio.types.Atom<uranio.types.AtomName>,
					prop_def,
					prop_value,
					this.atom
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
				const k = key as keyof uranio.types.Molecule<uranio.types.AtomName>;
				if(this.validate_property(k) === false){
					is_form_valid = false;
					this.focus(k);
				}
			}
			return is_form_valid;
		},
		
		// custom_validate_form():boolean{
		//   try{
		//     uranio.core.atm.validate.atom(this.atom_name, this.atom);
		//     return true;
		//   }catch(e){
		//     if(e.type === urn_exception.ExceptionType.INVALID_ATOM){
		//       for(let i = 0; i < e.keys.length; i++){
		//         Vue.set(this.atom_props[e.keys[i]], 'state', 'error');
		//         Vue.set(
		//           this.atom_props[e.keys[i]],
		//           'error_message',
		//           _format_message(e.msg)
		//         );
		//       }
		//     }
		//     urn_log.error(e);
		//     return false;
		//   }
		// },
		
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

function _is_property_empty<A extends uranio.types.AtomName>(
	atom_name:A,
	atom:uranio.types.AtomShape<A>,
	prop_key:keyof uranio.types.Book.Definition.Properties
):boolean{
	let is_empty = false;
	const prop_def = uranio.book.atom.get_property_definition(atom_name, prop_key);
	if(!prop_def.optional && !prop_def.hidden){
		const k = prop_key as keyof typeof atom;
		if(typeof atom[k] === 'undefined'){
			is_empty = true;
		}else{
			switch(prop_def.type){
				case uranio.types.BookPropertyType.ATOM:{
					if(atom[k] === {} || atom[k] === ''){
						is_empty = true;
					}
					break;
				}
				case uranio.types.BookPropertyType.SET_NUMBER:
				case uranio.types.BookPropertyType.SET_STRING:
				case uranio.types.BookPropertyType.ATOM_ARRAY:{
					if((atom[k] as Array<any>).length === 0){
						is_empty = true;
					}
					break;
				}
				case uranio.types.BookPropertyType.BINARY:{
					break;
				}
				case uranio.types.BookPropertyType.TIME:
				case uranio.types.BookPropertyType.DAY:{
					if(!atom[k]){
						is_empty = true;
					}
					break;
				}
				case uranio.types.BookPropertyType.TEXT:
				case uranio.types.BookPropertyType.LONG_TEXT:
				case uranio.types.BookPropertyType.ID:
				case uranio.types.BookPropertyType.ENUM_STRING:
				case uranio.types.BookPropertyType.ENCRYPTED:
				case uranio.types.BookPropertyType.EMAIL:{
					if(!atom[k]){
						is_empty = true;
					}
					break;
				}
				case uranio.types.BookPropertyType.INTEGER:
				case uranio.types.BookPropertyType.FLOAT:
				case uranio.types.BookPropertyType.ENUM_NUMBER:{
					if(isNaN(atom[k] as unknown as number)){
						is_empty = true;
					}
					break;
				}
			}
		}
	}
	return is_empty;
}

// function _empty_required_properties<A extends uranio.types.AtomName>(atom_name: A, atom:uranio.types.Atom<A>)
//     :(keyof uranio.types.Book.Definition<A>)[]{
//   const atom_prop_defs = atom_book[atom_name].properties;
//   const empty_required_keys:(keyof uranio.types.Book.Definition<A>)[] = [];
//   for(const [prop_key, _prop_def] of Object.entries(atom_prop_defs)){
//     if(_is_property_empty(atom_name, atom, prop_key)){
//       empty_required_keys.push(prop_key as keyof uranio.types.Book.Definition<A>);
//     }
//   }
//   return empty_required_keys;
// }

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

