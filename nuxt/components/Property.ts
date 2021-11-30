import Vue from 'vue';

import { urn_util } from "urn-lib";

import uranio from 'uranio';

import { atom_book } from "uranio-books/atom";

import { UIAtomProp } from '../components/Form/Atom';

const atom_hard_properties = uranio.core.stc.atom_hard_properties;

const SETProps = ['PropertySETNUMBER', 'PropertySETSTRING'];

const ENUMProps = ['PropertyENUMNUMBER', 'PropertyENUMSTRING'];

type Data = {
	prop_type: string
	prop_label: string
}

type Methods = {
}

type Computed = {
	prop_classes:string
}

type Props = {
	atom: uranio.types.Atom<uranio.types.AtomName>
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
			if(this.prop.state === 'error'){
				prop_classes += ` urn-property-error`;
			}
			// if(this.prop.error === true){
			//   prop_classes += ` urn-property-error`;
			// }
			return prop_classes;
		}
	},
	
	data():Data {
		
		const atom_def = atom_book[this.atom_name as uranio.types.AtomName] as
			uranio.types.Book.BasicDefinition;
		
		const atom_def_props = atom_def["properties"];
		
		const prop_name = this.prop.name;
		
		let prop_type = "Empty";
		let prop_label = prop_name;
		
		if(urn_util.object.has_key(atom_hard_properties, prop_name)) {
			
			prop_type = "PropertyReadOnly";
			prop_label = atom_hard_properties[prop_name].label;
			
		} else if (urn_util.object.has_key(atom_def_props, prop_name)) {
			
			prop_type = `Property${atom_def_props[prop_name].type.replace(/_/g, "")}`;
			prop_label = atom_def_props[prop_name].label;
			
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
		};
		
	},
	
});
