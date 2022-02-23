"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const urn_lib_1 = require("urn-lib");
exports.default = vue_1.default.extend({
    data() {
        return {
            message: '',
            success: false,
            error_object: {}
        };
    },
    methods: {
        fail(trx_response) {
            window.scrollTo(0, 0);
            urn_lib_1.urn_log.error('ERR MSG: ', trx_response.err_msg);
            this.success = false;
            this.message = trx_response.message || 'Unknown error';
            const cloned_error = { ...trx_response };
            delete cloned_error.ex;
            this.error_object = cloned_error;
        },
    },
});
//# sourceMappingURL=shared.js.map