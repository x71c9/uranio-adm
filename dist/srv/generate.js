#!/usr/bin/env node
"use strict";
/**
 * Adm generate module
 *
 * @packageDocumentation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const result = dotenv_1.default.config();
if (result.error) {
    throw result.error;
}
process.env.URN_SUPERUSER_CREATE_ON_INIT = 'false';
__exportStar(require("./register"), exports);
const uranio = __importStar(require("./main"));
uranio.init({
    connect_on_init: false,
    // superuser_create_on_init: false,
    log_debug_info: false,
    dev_log_debug_info: false
});
const util = __importStar(require("../util/server"));
const default_conf_1 = require("../cln/default_conf");
let urn_command = 'all';
for (const argv of process.argv) {
    const splitted = argv.split('=');
    if (splitted[0] === 'urn_command'
        && typeof splitted[1] === 'string'
        && splitted[1] !== '') {
        urn_command = splitted[1];
    }
}
switch (urn_command) {
    case 'schema': {
        util.generate.schema_and_save();
        break;
    }
    case 'hooks': {
        // util.generate.hooks_and_save('trx');
        util.generate.hooks_and_save();
        break;
    }
    case 'hook-types': {
        util.generate.hook_types_and_save();
        break;
    }
    case 'client-config': {
        util.generate.client_config_and_save(default_conf_1.adm_client_config);
        break;
    }
    case 'atoms': {
        util.generate.schema_and_save();
        util.generate.hooks_and_save();
        util.generate.hook_types_and_save();
        break;
    }
    default: {
        util.generate.schema_and_save();
        util.generate.hooks_and_save();
        util.generate.hook_types_and_save();
        util.generate.client_config_and_save(default_conf_1.adm_client_config);
        break;
    }
}
//# sourceMappingURL=generate.js.map