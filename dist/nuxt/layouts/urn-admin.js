"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const urn_lib_1 = require("urn-lib");
urn_lib_1.urn_log.init({
    log_level: urn_lib_1.urn_log.LogLevel.FUNCTION_DEBUG,
    context: urn_lib_1.urn_log.LogContext.BROWSER,
    prefix: '[URANIO]'
});
const client_1 = __importDefault(require("uranio/client"));
client_1.default.init();
exports.default = vue_1.default.extend({
    data() {
        return {};
    },
    methods: {}
});
//# sourceMappingURL=urn-admin.js.map