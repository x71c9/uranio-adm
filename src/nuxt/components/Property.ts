import Vue from 'vue';

import { urn_util } from "urn-lib";

import uranio from 'uranio/client';

// import { atom_book } from "uranio-books/atom";

import { UIAtomProp, PropState } from '../components/Form/Atom';

const atom_hard_properties = uranio.core.stc.atom_hard_properties;

const SETProps = ['PropertySETNUMBER', 'PropertySETSTRING'];

const ENUMProps = ['PropertyENUMNUMBER', 'PropertyENUMSTRING'];

type Data = {
	prop_type: string
	prop_label: string
	prop_key: string
	type_type: string
}

type Methods = {
}

type Computed = {
	prop_classes:string
}

type Props = {
	atom: uranio.schema.Atom<uranio.schema.AtomName>
	atom_name: string
	prop: UIAtomProp
}

type Provide = {
	prop_name: string
	prop_type: string
}

export default Vue.extend<Data, Methods, Computed, Props>({
	
	props: {
		prop: Object,
		atom: Object,
		atom_name: String
	},
	
	inject:[
		'atom',
		'atom_name'
	],
	
	provide():Provide {
		return {
			prop_name: this.prop.name,
			prop_type: this.prop_type,
		};
	},
	
	computed: {
		prop_classes():string{
			const classes = (this.prop.style.classes && this.prop.style.classes !== '') ?
				' ' + this.prop.style.classes : '';
			let prop_classes = `ui-${this.prop_type}${classes}`;
			if(this.prop.style.full_width === true){
				prop_classes += ` urn-full-width`;
			}
			if(this.prop.optional === true){
				prop_classes += ` urn-property-optional`;
			}
			if(this.prop.state === PropState.ERROR){
				prop_classes += ` urn-property-error`;
			}
			return prop_classes;
		}
	},
	
	data():Data {
		
		// const atom_def = atom_book[this.atom_name as uranio.schema.AtomName] as
		//   uranio.types.Book.BasicDefinition;
		// const atom_def = uranio.api.book.atom.get_atom_definition(this.atom_name as uranio.schema.AtomName);
		
		// const atom_def_props = atom_def["properties"];
		const prop_defs = uranio.book.get_custom_property_definitions(this.atom_name as uranio.schema.AtomName);
		
		const prop_key = this.prop.name;
		
		let prop_type = 'Empty';
		let prop_label = prop_key;
		let type_type = '';
		
		if(urn_util.object.has_key(atom_hard_properties, prop_key)) {
			
			prop_type = "PropertyReadOnly";
			prop_label = atom_hard_properties[prop_key].label;
			
		} else if (urn_util.object.has_key(prop_defs, prop_key)) {
			
			prop_type = `Property${prop_defs[prop_key].type.replace(/_/g, "")}`;
			prop_label = prop_defs[prop_key].label;
			
		}
		
		switch(prop_type){
			case 'PropertyATOM':
			case 'PropertyATOMARRAY':{
				const prop_def = (prop_defs[prop_key] as uranio.types.Book.Definition.Property.Atom);
				type_type = `[${prop_def.atom}]`;
				break;
			}
			case 'PropertySETNUMBER':{
				type_type = `(number)`;
				break;
			}
			case 'PropertySETSTRING':{
				type_type = `(string)`;
				break;
			}
			case 'PropertyENUMNUMBER':{
				type_type = `(number)`;
				break;
			}
			case 'PropertyENUMSTRING':{
				type_type = `(string)`;
				break;
			}
		}
		
		if(SETProps.includes(prop_type)){
			prop_type = `PropertySET`;
		}
		
		if(ENUMProps.includes(prop_type)){
			prop_type = `PropertyENUM`;
		}
		
		return {
			prop_type,
			prop_label,
			prop_key,
			type_type
		};
		
	},
	
});
