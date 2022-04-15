"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropState = void 0;
const vue_1 = __importDefault(require("vue"));
const urn_lib_1 = require("urn-lib");
// const urn_exc = urn_exception.init('ADMIN_FORM_ATOM', 'Uranio admin Form Atom');
const client_1 = __importDefault(require("uranio/client"));
// import { atom_book } from "uranio-books/atom";
var PropState;
(function (PropState) {
    PropState["VALID"] = "VALID";
    PropState["WARNING"] = "WARNING";
    PropState["ERROR"] = "ERROR";
})(PropState = exports.PropState || (exports.PropState = {}));
exports.default = vue_1.default.extend({
    props: {
        atom: Object,
        atom_name: Object,
        call: String
    },
    inject: [
        'atom',
        'atom_name'
    ],
    data() {
        const atom_props = {};
        if (client_1.default.book.validate_name(this.atom_name)) {
            // const atom_def = atom_book[this.atom_name];
            // const atom_def_props = atom_def.properties as uranio.types.Book.Definition.Properties;
            const prop_defs = client_1.default.book.get_custom_properties_definition(this.atom_name);
            for (const [prop_name, prop_def] of Object.entries(prop_defs)) {
                if (this.call === 'update' && prop_def.hidden) {
                    continue;
                }
                atom_props[prop_name] = {
                    name: prop_name,
                    style: _fill_style(prop_def.style),
                    optional: prop_def.optional || false,
                    state: PropState.VALID,
                    error_message: '',
                    focus: false
                };
            }
            if (this.call === 'update') {
                for (const [prop_name, prop_def] of Object.entries(client_1.default.core.stc.atom_hard_properties)) {
                    if (!prop_def.hidden) {
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
        on_change(prop_name) {
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
        on_keyup(prop_name) {
            this.on_change(prop_name);
        },
        submit(_event) {
            urn_lib_1.urn_log.fn_debug(`submitting form`);
            if (this.validate_form()) {
                this.$emit('submit_atom_form');
            }
            else {
                this.error();
            }
        },
        submit_exit(_event) {
            urn_lib_1.urn_log.fn_debug(`submitting form and exit`);
            if (this.validate_form()) {
                this.$emit('submit_exit_atom_form');
            }
            else {
                this.error();
            }
        },
        delete_atom(_event) {
            urn_lib_1.urn_log.fn_debug(`deleting atom`);
            this.$emit('delete_atom');
        },
        go_back(_event) {
            urn_lib_1.urn_log.fn_debug(`going back`);
            this.$emit('go_back');
        },
        validate_property(prop_name) {
            const prop_def = client_1.default.book.get_property_definition(this.atom_name, prop_name);
            const prop_value = this.atom[prop_name];
            const prop = this.atom_props[prop_name];
            if (_is_property_empty(this.atom_name, this.atom, prop_name)) {
                prop.state = PropState.ERROR;
                prop.error_message = 'This field is required.';
                return false;
            }
            try {
                client_1.default.core.atom.validate.property(prop_name, prop_def, prop_value, this.atom);
                prop.state = PropState.VALID;
                prop.error_message = '';
            }
            catch (e) {
                const err = e;
                if (err.type === urn_lib_1.urn_exception.ExceptionType.INVALID_ATOM) {
                    prop.state = PropState.ERROR;
                    prop.error_message = _format_message(err.msg);
                }
                else {
                    urn_lib_1.urn_log.error(err);
                }
                return false;
            }
            return true;
        },
        validate_form() {
            let is_form_valid = true;
            for (const [key, _value] of Object.entries(this.atom_props)) {
                const k = key;
                if (this.validate_property(k) === false) {
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
        error() {
            this.error_class = true;
            setTimeout(() => this.error_class = false, 400);
        },
        focus(prop_name) {
            for (const [prop_name, _prop] of Object.entries(this.atom_props)) {
                this.atom_props[prop_name].focus = false;
            }
            this.atom_props[prop_name].focus = true;
        }
    },
});
function _is_property_empty(atom_name, atom, prop_key) {
    let is_empty = false;
    const prop_def = client_1.default.book.get_property_definition(atom_name, prop_key);
    if (!prop_def.optional && !prop_def.hidden) {
        const k = prop_key;
        if (typeof atom[k] === 'undefined') {
            is_empty = true;
        }
        else {
            switch (prop_def.type) {
                case client_1.default.types.PropertyType.ATOM: {
                    if (atom[k] === {} || atom[k] === '') {
                        is_empty = true;
                    }
                    break;
                }
                case client_1.default.types.PropertyType.SET_NUMBER:
                case client_1.default.types.PropertyType.SET_STRING:
                case client_1.default.types.PropertyType.ATOM_ARRAY: {
                    if (atom[k].length === 0) {
                        is_empty = true;
                    }
                    break;
                }
                case client_1.default.types.PropertyType.BINARY: {
                    break;
                }
                case client_1.default.types.PropertyType.TIME:
                case client_1.default.types.PropertyType.DAY: {
                    if (!atom[k]) {
                        is_empty = true;
                    }
                    break;
                }
                case client_1.default.types.PropertyType.TEXT:
                case client_1.default.types.PropertyType.LONG_TEXT:
                case client_1.default.types.PropertyType.ID:
                case client_1.default.types.PropertyType.ENUM_STRING:
                case client_1.default.types.PropertyType.ENCRYPTED:
                case client_1.default.types.PropertyType.EMAIL: {
                    if (!atom[k]) {
                        is_empty = true;
                    }
                    break;
                }
                case client_1.default.types.PropertyType.INTEGER:
                case client_1.default.types.PropertyType.FLOAT:
                case client_1.default.types.PropertyType.ENUM_NUMBER: {
                    if (isNaN(atom[k])) {
                        is_empty = true;
                    }
                    break;
                }
            }
        }
    }
    return is_empty;
}
// function _empty_required_properties<A extends uranio.schema.AtomName>(atom_name: A, atom:uranio.schema.Atom<A>)
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
function _fill_style(prop_def_style) {
    const default_style = {
        full_width: false,
        classes: ''
    };
    if (typeof prop_def_style === 'undefined') {
        prop_def_style = default_style;
    }
    else {
        for (const [key, value] of Object.entries(default_style)) {
            const k = key;
            if (typeof prop_def_style[k] === 'undefined') {
                prop_def_style[k] = value;
            }
        }
    }
    return prop_def_style;
}
function _format_message(str) {
    return str.replace(/`([^`]*)`/g, '<code>$1</code>');
}
//# sourceMappingURL=Atom.js.map