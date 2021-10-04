import Vue from 'vue';

import { urn_util } from "urn-lib";

import uranio from 'uranio';

import { atom_book } from "uranio-books/atom";

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
}

type Props = {
	atom: uranio.types.Atom<uranio.types.AtomName>
	atom_name: string
	prop_name: string
}

type Provide = {
	prop_name: string
	prop_type: string
}

// type SimpleAtom = {
//   [k:string]: any
// }

export default Vue.extend<Data, Methods, Computed, Props>({
	
	props: {
		prop_name: String,
		atom: Object,
		atom_name: String
	},
	
	inject:[
		'atom',
		'atom_name'
	],
	
	provide():Provide {
		return {
			prop_name: this.prop_name,
			prop_type: this.prop_type,
		};
	},
	
	data():Data {
		
		const atom_def = atom_book[this.atom_name as uranio.types.AtomName] as
			uranio.types.Book.BasicDefinition;
		
		const atom_def_props = atom_def["properties"];
		
		let prop_type = "Empty";
		let prop_label = this.prop_name;
		
		if(urn_util.object.has_key(atom_hard_properties, this.prop_name)) {
			
			prop_type = "PropertyReadOnly";
			prop_label = atom_hard_properties[this.prop_name].label;
			
		} else if (urn_util.object.has_key(atom_def_props, this.prop_name)) {
			
			prop_type = `Property${atom_def_props[this.prop_name].type.replace(/_/g, "")}`;
			prop_label = atom_def_props[this.prop_name].label;
			
		}
		
		if(SETProps.includes(prop_type)){
			prop_type = `PropertySET`;
		}
		
		if(ENUMProps.includes(prop_type)){
			prop_type = `PropertyENUM`;
		}
		
		return {
			prop_type,
			prop_label
		};
		
	},
	
});
