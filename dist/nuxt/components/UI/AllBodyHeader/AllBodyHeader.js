"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const client_1 = __importDefault(require("uranio/client"));
const urn_lib_1 = require("urn-lib");
var RealPropertyType;
(function (RealPropertyType) {
    RealPropertyType["ID"] = "string";
    RealPropertyType["TEXT"] = "string";
    RealPropertyType["LONG_TEXT"] = "string";
    RealPropertyType["EMAIL"] = "string";
    RealPropertyType["INTEGER"] = "number";
    RealPropertyType["FLOAT"] = "number";
    RealPropertyType["BINARY"] = "boolean";
    RealPropertyType["ENCRYPTED"] = "string";
    RealPropertyType["DAY"] = "datetime";
    RealPropertyType["TIME"] = "datetime";
    RealPropertyType["ENUM_STRING"] = "set";
    RealPropertyType["ENUM_NUMBER"] = "set";
    RealPropertyType["SET_STRING"] = "set";
    RealPropertyType["SET_NUMBER"] = "set";
    RealPropertyType["ATOM"] = "object";
    RealPropertyType["ATOM_ARRAY"] = "set";
})(RealPropertyType || (RealPropertyType = {}));
exports.default = vue_1.default.extend({
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
    data() {
        let sorted_by = `_date`;
        let sorted_direction = -1;
        sorted_by = Object.keys(this.page.sort_by)[0];
        sorted_direction = this.page.sort_by[sorted_by];
        let total_label = this.plural;
        if (this.page.total_atom_count === 1) {
            total_label = this.atom_name;
        }
        const atom_def = client_1.default.book.get_definition(this.atom_name);
        const dock_def = client_1.default.book.get_dock_definition(this.atom_name);
        let connection = 'main';
        if (typeof atom_def.connection === 'string' && atom_def.connection !== 'main') {
            connection = atom_def.connection;
        }
        let dock_url = '/' + this.atom_name;
        if (typeof (dock_def === null || dock_def === void 0 ? void 0 : dock_def.url) === 'string') {
            dock_url = dock_def.url;
        }
        const sort_items = [];
        // const atom_properties = {
        //   ...uranio.core.stc.atom_hard_properties,
        //   ...atom_def.properties
        // };
        const atom_properties = client_1.default.book.get_full_properties_definition(this.atom_name);
        let current_sort_prop_name = '_date';
        let current_sort_direction = -1;
        for (const [prop_name, direction] of Object.entries(this.page.sort_by)) {
            current_sort_prop_name = prop_name;
            current_sort_direction = direction;
        }
        for (const [prop_name, prop_def] of Object.entries(atom_properties)) {
            if (prop_def.sortable === false || prop_def.optional === true) {
                continue;
            }
            const radio_item_asc = {};
            radio_item_asc.label = prop_name;
            radio_item_asc.selected = (current_sort_prop_name == prop_name
                && current_sort_direction == 1);
            radio_item_asc.value = {};
            radio_item_asc.value[prop_name] = 1;
            const radio_item_des = {};
            radio_item_des.label = prop_name;
            radio_item_des.selected = (current_sort_prop_name == prop_name
                && current_sort_direction == -1);
            radio_item_des.value = {};
            radio_item_des.value[prop_name] = -1;
            const real_type = RealPropertyType[prop_def.type];
            switch (real_type) {
                case 'string': {
                    radio_item_asc.label += ` (A - Z)`;
                    radio_item_des.label += ` (Z - A)`;
                    break;
                }
                case 'number': {
                    radio_item_asc.label += ` (ascending)`;
                    radio_item_des.label += ` (descending)`;
                    break;
                }
                case 'datetime': {
                    radio_item_asc.label += ` (oldest first)`;
                    radio_item_des.label += ` (newest first)`;
                    break;
                }
                case 'boolean': {
                    continue;
                    // radio_item_asc.label += ` (ascending)`;
                    // radio_item_des.label += ` (descending)`;
                    // break;
                }
                case 'set': {
                    continue;
                    // radio_item_asc.label += ` (ascending)`;
                    // radio_item_des.label += ` (descending)`;
                    // break;
                }
                case 'object': {
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
        return {
            sort_items,
            sort_list_visible: false,
            from_blur: false,
            search_input_focused: false,
            total_label,
            connection,
            dock_url,
            sorted_by,
            sorted_direction,
            // total_atom_count_format
        };
    },
    computed: {
        total_atom_count_format() {
            return urn_lib_1.urn_util.number.format(this.page.total_atom_count, 2);
        }
    },
    methods: {
        toggle_sort_list() {
            this.sort_list_visible = !this.sort_list_visible;
            if (this.sort_list_visible === true) {
                const $sort_list = this.$refs.sort_list;
                $sort_list.focus();
            }
        },
        on_sort_list_blur() {
            setTimeout(() => { this.sort_list_visible = false; }, 200);
        },
        update_sort() {
            for (let i = 0; i < this.sort_items.length; i++) {
                if (this.sort_items[i].selected === true) {
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
                    sort: this.page.sort_by
                }
            });
        }
    },
});
//# sourceMappingURL=AllBodyHeader.js.map