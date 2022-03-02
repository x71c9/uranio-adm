"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const urn_lib_1 = require("urn-lib");
const client_1 = __importDefault(require("uranio/client"));
// import { atom_book } from "uranio-books/atom";
const Atom_1 = require("../components/Form/Atom");
const atom_hard_properties = client_1.default.core.stc.atom_hard_properties;
const SETProps = ['PropertySETNUMBER', 'PropertySETSTRING'];
const ENUMProps = ['PropertyENUMNUMBER', 'PropertyENUMSTRING'];
exports.default = vue_1.default.extend({
    props: {
        prop: Object,
        atom: Object,
        atom_name: String
    },
    inject: [
        'atom',
        'atom_name'
    ],
    provide() {
        return {
            prop_name: this.prop.name,
            prop_type: this.prop_type,
        };
    },
    computed: {
        prop_classes() {
            const classes = (this.prop.style.classes && this.prop.style.classes !== '') ?
                ' ' + this.prop.style.classes : '';
            let prop_classes = `ui-${this.prop_type}${classes}`;
            if (this.prop.style.full_width === true) {
                prop_classes += ` urn-full-width`;
            }
            if (this.prop.optional === true) {
                prop_classes += ` urn-property-optional`;
            }
            if (this.prop.state === Atom_1.PropState.ERROR) {
                prop_classes += ` urn-property-error`;
            }
            return prop_classes;
        }
    },
    data() {
        // const atom_def = atom_book[this.atom_name as uranio.schema.AtomName] as
        //   uranio.types.Book.BasicDefinition;
        // const atom_def = uranio.api.book.atom.get_atom_definition(this.atom_name as uranio.schema.AtomName);
        // const atom_def_props = atom_def["properties"];
        const prop_defs = client_1.default.book.get_custom_properties_definition(this.atom_name);
        const prop_key = this.prop.name;
        let prop_type = 'Empty';
        let prop_label = prop_key;
        let type_type = '';
        if (urn_lib_1.urn_util.object.has_key(atom_hard_properties, prop_key)) {
            prop_type = "PropertyReadOnly";
            prop_label = atom_hard_properties[prop_key].label;
        }
        else if (urn_lib_1.urn_util.object.has_key(prop_defs, prop_key)) {
            prop_type = `Property${prop_defs[prop_key].type.replace(/_/g, "")}`;
            prop_label = prop_defs[prop_key].label;
        }
        switch (prop_type) {
            case 'PropertyATOM':
            case 'PropertyATOMARRAY': {
                const prop_def = prop_defs[prop_key];
                type_type = `[${prop_def.atom}]`;
                break;
            }
            case 'PropertySETNUMBER': {
                type_type = `(number)`;
                break;
            }
            case 'PropertySETSTRING': {
                type_type = `(string)`;
                break;
            }
            case 'PropertyENUMNUMBER': {
                type_type = `(number)`;
                break;
            }
            case 'PropertyENUMSTRING': {
                type_type = `(string)`;
                break;
            }
        }
        if (SETProps.includes(prop_type)) {
            prop_type = `PropertySET`;
        }
        if (ENUMProps.includes(prop_type)) {
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
//# sourceMappingURL=Property.js.map