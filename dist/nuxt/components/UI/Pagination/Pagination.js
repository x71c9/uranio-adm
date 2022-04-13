"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const urn_lib_1 = require("urn-lib");
exports.default = vue_1.default.extend({
    inject: [
        'page',
        'atom_name'
    ],
    data() {
        const previous_link = _index_url(this.page.index, this.page, this.atom_name);
        const next_link = _index_url(this.page.index + 2, this.page, this.atom_name);
        const page_links = [];
        for (let i = 0; i < this.page.total_page_num; i++) {
            const page_link = _index_url(i + 1, this.page, this.atom_name);
            page_links[i] = page_link;
        }
        return {
            change_page_value: this.page.index + 1,
            item_per_page_value: this.page.query_limit,
            previous_link,
            next_link,
            page_links
        };
    },
    methods: {
        change_page() {
            this.$router.push({
                name: 'urn-admin-slug',
                params: {
                    slug: this.atom_name
                },
                query: _get_query(this.page, this.change_page_value, this.item_per_page_value)
            });
        },
        change_item_per_page() {
            this.$router.push({
                name: 'urn-admin-slug',
                params: {
                    slug: this.atom_name
                },
                query: _get_query(this.page, this.change_page_value, this.item_per_page_value)
            });
        }
    }
});
function _get_query(page, page_value, item_per_page) {
    const query_object = {
        page: page_value.toString(),
        limit: item_per_page.toString(),
        sort: page.sort_by,
    };
    if (page.search_query && page.search_query !== '') {
        query_object.q = page.search_query;
    }
    return query_object;
}
function _index_url(index, page, atom_name) {
    const query_string = _query_string(page, index);
    return `/urn-admin/${atom_name}?${query_string}`;
}
function _query_string(page, index) {
    const has_search_query = (page.search_query && page.search_query !== '');
    const params = {
        page: index.toString(),
        limit: page.query_limit.toString(),
        sort: page.sort_by
    };
    if (has_search_query) {
        params.q = page.search_query;
    }
    const query_string = urn_lib_1.urn_util.url.encode_params(params);
    return query_string;
}
//# sourceMappingURL=Pagination.js.map