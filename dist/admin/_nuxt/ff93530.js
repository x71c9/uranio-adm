(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{495:function(t,e,n){"use strict";var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.check_if_element_is_visible=void 0;var r=o(n(0));function l(t){var rect=t.getBoundingClientRect(),e=Math.max(document.documentElement.clientHeight,window.innerHeight);return!(rect.bottom<0||rect.top-e>=0)}e.default=r.default.extend({inject:["atom","atom_name","prop_name","prop_type"],props:{atom:Object,atom_name:String,prop_name:String,prop_type:String,focus:Boolean},watch:{focus:function(t,e){var n=this.$refs.input;if(!0===t&&n.focus&&n.focus(),this.$el.offsetTop){var o=this.$el.offsetTop-34;l(this.$el)||window.scrollTo(0,o)}}}}),e.check_if_element_is_visible=l},498:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return r}));var o=n(0);function r(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return o.default.extend({mixins:t})}},587:function(t,e,n){"use strict";n.r(e);var o=n(588),r=n.n(o);for(var l in o)["default"].indexOf(l)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(l);e.default=r.a},588:function(t,e,n){"use strict";var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var r=o(n(498)),l=n(63),c=o(n(62)),d=o(n(495));e.default=r.default(d.default).extend({mixins:[d.default],data:function(){return{prop_atom_name:c.default.book.get_property_definition(this.atom_name,this.prop_name).atom}},methods:{remove:function(){l.urn_log.debug(this.atom),this.$set(this.atom,this.prop_name,""),l.urn_log.debug(this.atom)},add:function(){this.$store.dispatch("modalAtom/open_modal",{prop_name:this.prop_name,prop_atom:this.prop_atom_name,multiple:!1,replace:!0})}}})},776:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return r}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.atom[t.prop_name]?n("div",[n("div",{staticClass:"ui-li-element ui-li-atom"},[n("div",{staticClass:"name"},[t._v("\n\t\t\t\t"+t._s(t.atom[t.prop_name])+"\n\t\t\t")]),t._v(" "),n("UIButton",{staticClass:"visit small secondary"},[n("NuxtLink",{attrs:{to:"/urn-admin/"+t.prop_atom_name+"/"+t.atom[t.prop_name]}},[n("img",{attrs:{src:"/img/icons/png/insert_link.png"}}),t._v("\n\t\t\t\t\tVisit\n\t\t\t\t")])],1),t._v(" "),n("UIButton",{staticClass:"small secondary red",nativeOn:{click:function(e){return e.preventDefault(),t.remove.apply(null,arguments)}}},[t._v("\n\t\t\t\tRemove\n\t\t\t")])],1)]):n("div",[n("UIButton",{staticClass:"secondary",nativeOn:{click:function(e){return e.preventDefault(),t.add.apply(null,arguments)}}},[t._v("Add")])],1),t._v(" "),n("div",{staticStyle:{display:"none"}},[n("input",{staticClass:"urn_input",attrs:{type:"hidden",name:t.prop_name},domProps:{value:t.atom[t.prop_name]}})])])},r=[]},797:function(t,e,n){"use strict";n.r(e);var o=n(776),r=n(587);for(var l in r)["default"].indexOf(l)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(l);var c=n(2),component=Object(c.a)(r.default,o.a,o.b,!1,null,null,null);e.default=component.exports,installComponents(component,{UIButton:n(298).default})}}]);