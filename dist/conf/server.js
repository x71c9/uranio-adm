"use strict";
/**
 * Server Conf module
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
exports.set_service_url = exports.get_service_url = exports.get_all = exports.set = exports.get = void 0;
const urn_lib_1 = require("urn-lib");
const uranio_trx_1 = __importDefault(require("uranio-trx"));
const defaults_1 = require("./defaults");
const env = __importStar(require("../env/server"));
const urn_ctx = urn_lib_1.urn_context.create(defaults_1.adm_config, env.is_production(), 'ADM:CONF');
function get(param_name) {
    return urn_ctx.get(param_name);
}
exports.get = get;
function set(config) {
    urn_ctx.set(config);
    set_service_url(_build_service_url());
}
exports.set = set;
function get_all() {
    return urn_ctx.get_all();
}
exports.get_all = get_all;
function get_service_url() {
    return uranio_trx_1.default.conf.get_service_url();
}
exports.get_service_url = get_service_url;
function set_service_url(url) {
    return uranio_trx_1.default.conf.set_service_url(url);
}
exports.set_service_url = set_service_url;
/**
 * This method differs from the client counterpart since there is no need
 * to proxy the hooks to the Panel URL.
 */
function _build_service_url() {
    const service_proxy = get(`service_proxy`);
    if (typeof service_proxy === 'string' && service_proxy) {
        return service_proxy;
    }
    const prefix = get(`prefix_api`);
    const service_protocol = get(`service_protocol`);
    const service_domain = get(`service_domain`);
    const service_port = get(`service_port`);
    return `${service_protocol}://${service_domain}:${service_port}${prefix}`;
}
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
//# sourceMappingURL=server.js.map