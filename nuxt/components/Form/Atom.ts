import Vue from 'vue';

import { urn_util } from "urn-lib";

import uranio from 'uranio';

import { atom_book } from "uranio-books/atom";

export type UIAtomProp = {
	name: string
	optional: boolean
	state: 'valid' | 'warning' | 'error'
	// error: boolean
	style: uranio.types.Book.Definition.Property.AdminStyle
}

type UIAtomProps = {
	[k:string]: UIAtomProp
}

type Data = {
	atom_props: UIAtomProps
}

type Methods = {
	submit: (event:Event) => void
	submit_exit: (event:Event) => void
	delete_atom: (event:Event) => void
	validate_form: () => boolean
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
		
		if (urn_util.object.has_key(atom_book, this.atom_name)) {
			
			const atom_def = atom_book[this.atom_name];
			const atom_def_props = atom_def.properties as uranio.types.Book.Definition.Properties;
			
			for(const [prop_name, prop_def] of Object.entries(atom_def_props)){
				if(!prop_def.hidden){
					atom_props[prop_name] = {
						name: prop_name,
						style: _fill_style(prop_def.style),
						optional: prop_def.optional || false,
						state: 'valid'
						// error: false
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
							state: 'valid'
							// error: false
						};
					}
				}
			}
		}
		
		return {
			atom_props,
		};
		
	},
	
	methods: {
		
		on_change(prop_name:keyof uranio.types.Molecule<uranio.types.AtomName>)
				:void{
			
			const atom_value = this.atom[prop_name];
			const prop = this.atom_props[prop_name];
			if(prop.state === 'error' && atom_value){
				prop.state = 'valid';
			}else if(prop.state !== 'error' && !atom_value){
				prop.state = 'error';
			}
			// if(prop.error === true && atom_value){
			//   prop.error = false;
			// }else if(prop.error === false && !atom_value){
			//   prop.error = true;
			// }
		},
		
		on_keyup(prop_name:keyof uranio.types.Molecule<uranio.types.AtomName>)
				:void{
			this.on_change(prop_name);
		},
		
		submit(_event: Event):void {
			
			if(this.validate_form()){
				
				this.$emit('submit_atom_form');
				
			}
			
		},
		
		submit_exit(_event:Event):void{
			
			if(this.validate_form()){
				
				this.$emit('submit_exit_atom_form');
				
			}
		},
		
		delete_atom(_event:Event):void{
			
			this.$emit('delete_atom');
			
		},
		
		validate_form():boolean{
			
			const empty_required_keys = _empty_required_properties(
				this.atom_name,
				this.atom
			);
			
			for(const [key, _value] of Object.entries(this.atom_props)){
				// Vue.set(this.atom_props[key], 'error', false);
				Vue.set(this.atom_props[key], 'state', 'valid');
			}
			
			if(empty_required_keys.length > 0){
				
				for(let i = 0; i < empty_required_keys.length; i++){
					// Vue.set(this.atom_props[empty_required_keys[i]], 'error', true);
					Vue.set(this.atom_props[empty_required_keys[i]], 'state', 'error');
				}
				
				return false;
				
			}
			
			return true;
			
		}
	},
	
});

function _empty_required_properties<A extends uranio.types.AtomName>(atom_name: A, atom:uranio.types.Atom<A>)
		:(keyof uranio.types.Book.Definition<A>)[]{
	const atom_prop_defs = atom_book[atom_name].properties;
	const empty_required_keys:(keyof uranio.types.Book.Definition<A>)[] = [];
	for(const [prop_key, prop_def] of Object.entries(atom_prop_defs)){
		const k = prop_key as keyof typeof atom;
		if(!prop_def.optional || prop_def.optional === false){
			const atom_def = atom_book[atom_name] as uranio.types.Book.BasicDefinition;
			const atom_properties = atom_def.properties as uranio.types.Book.Definition.Properties;
			const prop_def = atom_properties[prop_key] as uranio.types.Book.Definition.Property;
			let is_empty = false;
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
						if(atom[k] === ''){
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
						if(atom[k] === ''){
							is_empty = true;
						}
						break;
					}
					case uranio.types.BookPropertyType.INTEGER:
					case uranio.types.BookPropertyType.FLOAT:
					case uranio.types.BookPropertyType.ENUM_NUMBER:{
						if(atom[k] === ''){
							is_empty = true;
						}
						break;
					}
				}
			}
			if(is_empty){
				empty_required_keys.push(k as keyof uranio.types.Book.Definition<A>);
			}
		}
	}
	return empty_required_keys;
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
