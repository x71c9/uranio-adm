"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const vuedraggable_1 = __importDefault(require("vuedraggable"));
exports.default = vue_1.default.extend({
    data() {
        return {
            dragging: false,
            drag_group: ''
        };
    },
    components: {
        draggable: vuedraggable_1.default,
    },
    methods: {
        drag_start() {
            this.dragging = true;
        },
        drag_end() {
            this.dragging = false;
        },
    },
    computed: {
        drag_options() {
            return {
                animation: 200,
                group: this.drag_group,
                disabled: false,
                ghostClass: "ghost",
                dragClass: "dragging"
            };
        },
    },
});
//# sourceMappingURL=Sortable.js.map