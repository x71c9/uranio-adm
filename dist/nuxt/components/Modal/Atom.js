"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
exports.default = vue_1.default.extend({
    data() {
        const atoms = [];
        const message = '';
        return {
            atoms,
            message
        };
    },
    // computed: {
    //   atoms():Promise<uranio.schema.Atom<uranio.schema.AtomName>[]>{
    //     return await this.get_atoms();
    //   },
    //   message():string{
    //     return this.message;
    //   }
    // },
    methods: {
        // async get_atoms<A extends uranio.schema.AtomName>()
        //       :Promise<uranio.schema.Atom<any>[]>{
        //   urn_log.debug('GET_ATOMS');
        //   const atom_name = this.$store.state.modalAtom.atom_prop_atom;
        //   const trx_base = uranio.base.create(atom_name);
        //   const trx_response = await trx_base.hook(
        //     "find" as uranio.types.RouteName<A>
        //   )({});
        //   if(trx_response.success && Array.isArray(trx_response.payload)){
        //     return this.atoms = trx_response.payload;
        //   }else{
        //     this.message = trx_response.message || 'ERROR';
        //   }
        //   return [];
        // },
        submit() {
            this.$emit("atom_selected");
            this.$store.dispatch('modalAtom/close_modal');
            this.$store.dispatch('modalAtom/reset_atoms');
        },
        select(atom_id) {
            this.$store.dispatch('modalAtom/select_atom', atom_id);
        },
        close() {
            this.$store.dispatch('modalAtom/close_modal');
        }
    }
});
//# sourceMappingURL=Atom.js.map