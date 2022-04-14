"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
// import {urn_util} from 'urn-lib';
const _slug_1 = require("../../../pages/urn-admin/_slug");
exports.default = vue_1.default.extend({
    inject: [
        'page_query',
        'page_data',
        'atom_name',
    ],
    data() {
        return {
            change_page_value: this.page_query.index + 1,
            item_per_page_value: this.page_query.limit,
        };
    },
    methods: {
        change_page() {
            this.$router.push({
                name: 'urn-admin-slug',
                params: {
                    slug: this.atom_name
                },
                query: (0, _slug_1.query_object)(this.page_query, { page: this.change_page_value })
            });
        },
        change_item_per_page() {
            this.$router.push({
                name: 'urn-admin-slug',
                params: {
                    slug: this.atom_name
                },
                query: (0, _slug_1.query_object)(this.page_query, { page: this.change_page_value, limit: this.item_per_page_value })
            });
        },
        limit_link(limit) {
            return (0, _slug_1.get_url)(this.atom_name, this.page_query, { limit: limit });
        }
    },
    computed: {
        previous_link() {
            const previous_link = (0, _slug_1.get_url)(this.atom_name, this.page_query, { page: this.page_query.index });
            return previous_link;
        },
        next_link() {
            const next_link = (0, _slug_1.get_url)(this.atom_name, this.page_query, { page: (this.page_query.index + 2) });
            return next_link;
        },
        page_links() {
            const page_links = [];
            for (let i = 0; i < this.page_data.total_pages; i++) {
                const page_link = (0, _slug_1.get_url)(this.atom_name, this.page_query, { page: (i + 1) });
                page_links[i] = page_link;
            }
            return page_links;
        }
    },
});
//# sourceMappingURL=Pagination.js.map