import Vue from "vue";

import uranio from 'uranio/client';

import { urn_util } from "urn-lib";

import {Page} from '../../../pages/urn-admin/_slug';

enum RealPropertyType {
	ID = 'string',
	TEXT = 'string',
	LONG_TEXT = 'string',
	EMAIL = 'string',
	INTEGER = 'number',
	FLOAT = 'number',
	BINARY = 'boolean',
	ENCRYPTED = 'string',
	DAY = 'datetime',
	TIME = 'datetime',
	ENUM_STRING = 'set',
	ENUM_NUMBER = 'set',
	SET_STRING = 'set',
	SET_NUMBER = 'set',
	ATOM = 'object',
	ATOM_ARRAY = 'set'
}
type SortValue = {
	[prop_name:string]: 1 | -1
}
type SortItem = {
	label: string
	selected: boolean
	value: SortValue
}

type Data = {
	sort_items: SortItem[]
	sort_list_visible: boolean
	from_blur: boolean
	total_label: string
	connection: string
	dock_url: string
	search_input_focused: boolean
	sorted_by: string
	sorted_direction: 1 | -1
	search_value: string
	// total_atom_count_format: string
};
type Methods = {
	update_sort: () => void
	on_sort_list_blur: () => void
	toggle_sort_list: () => void
	debounce_method: () => void
};
type Computed = {
	total_atom_count_format: string
};
type Props = {
	page: Page
	plural: string
	atoms: uranio.schema.Atom<uranio.schema.AtomName>[]
	atom_name: uranio.schema.AtomName
};

let _debounce_time:ReturnType<typeof setTimeout>;

export default Vue.extend<Data, Methods, Computed, Props>({
	inject: [
		"atoms",
		"atom_name",
		"page",
		"plural"
	],
	props: {
		page: Object,
		plural: String,
		atoms: Array,
		atom_name: Object
	},
	data():Data {
		
		let sorted_by = `_date`;
		let sorted_direction = -1 as -1 | 1;
		
		sorted_by = Object.keys(this.page.sort_by)[0];
		sorted_direction = this.page.sort_by[sorted_by];
		
		let total_label = this.plural;
		if(this.page.total_atom_count === 1){
			total_label = this.atom_name;
		}
		
		const atom_def = uranio.book.get_definition(this.atom_name);
		
		const dock_def = uranio.book.get_dock_definition(this.atom_name);
		
		let connection = 'main';
		if(typeof atom_def.connection === 'string' && atom_def.connection !== 'main'){
			connection = atom_def.connection;
		}
		
		let dock_url = '/' + this.atom_name;
		if(typeof dock_def?.url === 'string'){
			dock_url = dock_def.url;
		}
		
		const sort_items:SortItem[] = [];
		
		// const atom_properties = {
		//   ...uranio.core.stc.atom_hard_properties,
		//   ...atom_def.properties
		// };
		const atom_properties = uranio.book.get_properties_definition(this.atom_name);
		
		let current_sort_prop_name = '_date';
		let current_sort_direction = -1;
		for(const [prop_name, direction] of Object.entries(this.page.sort_by)){
			current_sort_prop_name = prop_name;
			current_sort_direction = direction;
		}
		
		for(const [prop_name, prop_def] of Object.entries(atom_properties)){
			if(prop_def.sortable === false || prop_def.optional === true){
				continue;
			}
			const radio_item_asc = {} as SortItem;
			radio_item_asc.label = prop_name;
			radio_item_asc.selected = (
				current_sort_prop_name == prop_name
				&& current_sort_direction == 1
			);
			radio_item_asc.value = {};
			radio_item_asc.value[prop_name] = 1;
			
			const radio_item_des = {} as SortItem;
			radio_item_des.label = prop_name;
			radio_item_des.selected = (
				current_sort_prop_name == prop_name
				&& current_sort_direction == -1
			);
			radio_item_des.value = {};
			radio_item_des.value[prop_name] = -1;
			
			const real_type = RealPropertyType[prop_def.type];
			switch(real_type){
				case 'string':{
					radio_item_asc.label += ` (A - Z)`;
					radio_item_des.label += ` (Z - A)`;
					break;
				}
				case 'number':{
					radio_item_asc.label += ` (ascending)`;
					radio_item_des.label += ` (descending)`;
					break;
				}
				case 'datetime':{
					radio_item_asc.label += ` (oldest first)`;
					radio_item_des.label += ` (newest first)`;
					break;
				}
				case 'boolean':{
					continue;
					// radio_item_asc.label += ` (ascending)`;
					// radio_item_des.label += ` (descending)`;
					// break;
				}
				case 'set':{
					continue;
					// radio_item_asc.label += ` (ascending)`;
					// radio_item_des.label += ` (descending)`;
					// break;
				}
				case 'object':{
					continue;
					// radio_item_asc.label += ` (ascending)`;
					// radio_item_des.label += ` (descending)`;
					// break;
				}
			}
			sort_items.push(radio_item_asc);
			sort_items.push(radio_item_des);
		}
		
		// const total_atom_count_format = urn_util.number.format(this.page.total_atom_count,2);
		
		return{
			sort_items,
			sort_list_visible: false,
			from_blur: false,
			search_input_focused: false,
			total_label,
			connection,
			dock_url,
			sorted_by,
			sorted_direction,
			search_value: ''
			// total_atom_count_format
		};
	},
	watch: {
		search_value(new_value:string, old_value:string) {
			if(new_value != old_value){
				clearTimeout(_debounce_time);
				_debounce_time = setTimeout(this.debounce_method, 477);
			}
		}
	},
	computed:{
		total_atom_count_format(){
			return urn_util.number.format(this.page.total_atom_count,2);
		}
	},
	methods:{
		debounce_method():void{
			this.$emit('search', this.search_value);
		},
		toggle_sort_list():void{
			this.sort_list_visible = !this.sort_list_visible;
			if(this.sort_list_visible === true){
				const $sort_list = this.$refs.sort_list;
				($sort_list as HTMLElement).focus();
			}
		},
		on_sort_list_blur():void{
			setTimeout(() => {this.sort_list_visible = false;}, 200);
		},
		update_sort():void{
			for(let i = 0; i < this.sort_items.length; i++){
				if(this.sort_items[i].selected === true){
					const value = this.sort_items[i].value;
					this.page.sort_by = value;
					break;
				}
			}
			this.$router.push({
				name: 'urn-admin-slug',
				params: {
					slug: this.atom_name
				},
				query: {
					page: (this.page.index + 1).toString(),
					limit: this.page.query_limit.toString(),
					sort: this.page.sort_by as any
				}
			});
		}
	},
});
