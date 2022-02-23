"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
exports.default = vue_1.default.extend({
    inject: [
        'page',
        'atom_name'
    ],
    data() {
        return {
            change_page_value: this.page.index + 1,
            item_per_page_value: this.page.query_limit
        };
    },
    methods: {
        change_page() {
            this.$router.push({
                name: 'urn-admin-slug',
                params: {
                    slug: this.atom_name
                },
                query: {
                    page: this.change_page_value.toString(),
                    limit: this.page.query_limit.toString(),
                    sort: this.page.sort_by
                }
            });
        },
        change_item_per_page() {
            this.$router.push({
                name: 'urn-admin-slug',
                params: {
                    slug: this.atom_name
                },
                query: {
                    page: this.change_page_value.toString(),
                    limit: this.item_per_page_value.toString(),
                    sort: this.page.sort_by
                }
            });
        }
    }
});
//# sourceMappingURL=Pagination.js.map