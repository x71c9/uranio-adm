import Vue from "vue";

import uranio from 'uranio';

// import { urn_util } from "urn-lib";

import { atom_book } from "uranio-books/atom";

import { dock_book } from "uranio-books/dock";

import {Page} from '../../../pages/urn-admin/_slug';

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
};
type Methods = {
	update_sort: () => void
	on_sort_list_blur: () => void
	toggle_sort_list: () => void
};
type Computed = {
};
type Props = {
	page: Page
	plural: string
	atoms: uranio.types.Atom<uranio.types.AtomName>[]
	atom_name: uranio.types.AtomName
};
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
		let sorted_direction = -1;
		
		sorted_by = Object.keys(this.page.sort_by)[0];
		sorted_direction = this.page.sort_by[sorted_by];
		
		let total_label = this.plural;
		if(this.page.total_atom_count === 1){
			total_label = this.atom_name;
		}
		
		const atom_def = atom_book[this.atom_name] as
			uranio.types.Book.BasicDefinition;
		
		const dock_def = dock_book[this.atom_name] as
			uranio.types.Book.BasicDefinition;
		
		let connection = 'main';
		if(typeof atom_def.connection === 'string' && atom_def.connection !== 'main'){
			connection = atom_def.connection;
		}
		
		let dock_url = '/' + this.atom_name;
		if(typeof dock_def.dock?.url === 'string'){
			dock_url = dock_def.dock.url;
		}
		
		const sort_items:SortItem[] = [];
		
		const atom_properties = {
			...uranio.core.stc.atom_hard_properties,
			...atom_def.properties
		};
		
		let current_sort_prop_name = '_date';
		let current_sort_direction = -1;
		for(const [prop_name, direction] of Object.entries(this.page.sort_by)){
			current_sort_prop_name = prop_name;
			current_sort_direction = direction;
		}
		
		for(const [prop_name, prop_def] of Object.entries(atom_properties)){
			if((prop_def as any).sortable === false){
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
			
			const real_type = uranio.types.BookPropertyStringType[prop_def.type];
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
		};
	},
	methods:{
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
