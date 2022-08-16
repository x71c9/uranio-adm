"use strict";
/**
 * Conf module
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
exports.get_service_url = exports.get_all = exports.set = exports.get = void 0;
const urn_lib_1 = require("urn-lib");
const client_1 = __importDefault(require("uranio-trx/client"));
const default_conf_1 = require("../client/default_conf");
const env = __importStar(require("../env/client"));
const urn_ctx = urn_lib_1.urn_context.create(default_conf_1.adm_client_config, env.is_production(), 'ADM:CONF:CLIENT');
function get(param_name) {
    return urn_ctx.get(param_name);
}
exports.get = get;
function set(config) {
    urn_ctx.set(config);
}
exports.set = set;
function get_all() {
    return urn_ctx.get_all();
}
exports.get_all = get_all;
function get_service_url() {
    return client_1.default.conf.get_service_url();
}
exports.get_service_url = get_service_url;
// export function get_service_url():string{
// 	const prefix = get(`prefix_api`);
// 	// If the configuraion cotains `panel_protocol`
// 	// it means the repo is uranio-adm, therefore the service url
// 	// is proxied by the panel
// 	if(typeof get(`panel_protocol` as any) === 'string'){
// 		const panel_protocol = get(`panel_protocol` as any);
// 		const panel_domain = get(`panel_domain` as any);
// 		const panel_port = get(`panel_port` as any);
// 		return `${panel_protocol}://${panel_domain}:${panel_port}${prefix}`;
// 	}
// 	const protocol = get(`service_protocol`);
// 	const domain = get(`service_domain`);
// 	const port = get(`service_port`);
// 	return `${protocol}://${domain}:${port}${prefix}`;
// }
//# sourceMappingURL=client.js.map