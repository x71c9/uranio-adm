"use strict";
/**
 * Generate module
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.save_client_config = exports.client_config_and_save = exports.client_config = exports.save_hook_types = exports.hook_types_and_save = exports.hook_types = exports.save_hooks_client = exports.save_hooks_server = exports.hooks_and_save = exports.save_schema = exports.schema_and_save = exports.schema = exports.process_params = void 0;
// import fs from 'fs';
const uranio_trx_1 = __importDefault(require("uranio-trx"));
const uranio_utils_1 = require("uranio-utils");
// import {Configuration} from '../typ/conf';
// import * as conf from '../conf/server';
// const required_server_config_client:Array<keyof Configuration> = [
// ];
exports.process_params = {
    urn_command: `schema`,
    // urn_hook_types_path: `./node_modules/uranio-trx/dist/hooks/types.d.ts`,
    // urn_hooks_path: `./node_modules/uranio/dist/hooks/hooks.ts`,
    // urn_output_dir: `.`,
    // urn_repo: 'adm'
};
function schema() {
    uranio_utils_1.urn_log.trace('Started generating uranio adm schema...');
    init();
    const trx_schema = uranio_trx_1.default.util.generate.schema();
    const text = _generate_uranio_schema_text(trx_schema);
    uranio_utils_1.urn_log.trace(`ADM Schema generated.`);
    return text;
}
exports.schema = schema;
function schema_and_save() {
    const text = schema();
    save_schema(text);
    uranio_utils_1.urn_log.trace(`Schema generated and saved.`);
}
exports.schema_and_save = schema_and_save;
function save_schema(text) {
    return uranio_trx_1.default.util.generate.save_schema(text);
}
exports.save_schema = save_schema;
// export function hooks_server():string{
// 	urn_log.trace('Started generating uranio adm server hooks...');
// 	init();
// 	const trx_hooks = trx.util.generate.hooks_server();
// 	const text = _generate_hooks_text_server(trx_hooks);
// 	urn_log.trace(`ADM Server Hooks generated.`);
// 	return text;
// }
// export function hooks_client():string{
// 	urn_log.trace('Started generating uranio adm client hooks...');
// 	init();
// 	const trx_hooks = trx.util.generate.hooks_client();
// 	const text = _generate_hooks_text_client(trx_hooks);
// 	urn_log.trace(`ADM Client Hooks generated.`);
// 	return text;
// }
function hooks_and_save() {
    // const hooks_text_server = hooks_server();
    // const hooks_text_client = hooks_client();
    // save_hooks_server(hooks_text_server);
    // save_hooks_client(hooks_text_client);
    uranio_trx_1.default.util.generate.hooks_and_save();
    uranio_utils_1.urn_log.trace(`ADM Hooks generated and saved.`);
}
exports.hooks_and_save = hooks_and_save;
function save_hooks_server(text) {
    uranio_trx_1.default.util.generate.save_hooks_server(text);
}
exports.save_hooks_server = save_hooks_server;
function save_hooks_client(text) {
    uranio_trx_1.default.util.generate.save_hooks_client(text);
}
exports.save_hooks_client = save_hooks_client;
function hook_types() {
    uranio_utils_1.urn_log.trace('Started generating uranio hook types...');
    init();
    const text = uranio_trx_1.default.util.generate.hook_types();
    uranio_utils_1.urn_log.trace(`ADM Hook types generated.`);
    return text;
}
exports.hook_types = hook_types;
function hook_types_and_save() {
    const text = hook_types();
    save_hook_types(text);
    uranio_utils_1.urn_log.trace(`Types generated and saved.`);
}
exports.hook_types_and_save = hook_types_and_save;
function save_hook_types(text) {
    return uranio_trx_1.default.util.generate.save_hook_types(text);
    // const output = `${process_params.urn_output_dir}/uranio-trx.d.ts`;
    // fs.writeFileSync(
    //   output,
    //   text
    // );
    // urn_log.trace(`Types saved in [${output}].`);
}
exports.save_hook_types = save_hook_types;
function client_config(client_default) {
    uranio_utils_1.urn_log.trace('Started generating uranio adm client config...');
    init();
    // const all_server_conf = conf.get_all();
    // for(const reqkey of required_server_config_client){
    //   (client_default as any)[`__server_${reqkey}`] = all_server_conf[reqkey];
    // }
    const text = uranio_trx_1.default.util.generate.client_config(client_default);
    uranio_utils_1.urn_log.trace(`ADM client config generated.`);
    return text;
}
exports.client_config = client_config;
function client_config_and_save(client_default) {
    const text = client_config(client_default);
    save_client_config(text);
    uranio_utils_1.urn_log.trace(`ADM Client config generated and saved.`);
}
exports.client_config_and_save = client_config_and_save;
function save_client_config(text) {
    uranio_trx_1.default.util.generate.save_client_config(text);
}
exports.save_client_config = save_client_config;
function init() {
    uranio_trx_1.default.util.generate.init();
    // process_params.urn_base_schema = trx.util.generate.process_params.urn_base_schema;
    exports.process_params.urn_command = uranio_trx_1.default.util.generate.process_params.urn_command;
    // process_params.urn_output_dir = trx.util.generate.process_params.urn_output_dir;
    // process_params.urn_hook_types_path = trx.util.generate.process_params.urn_hook_types_path;
    _init_adm_generate();
}
exports.init = init;
function _init_adm_generate() {
    // for(const argv of process.argv){
    //   const splitted = argv.split('=');
    //   if(
    //     splitted[0] === 'urn_base_types'
    //     && typeof splitted[1] === 'string'
    //     && splitted[1] !== ''
    //   ){
    //     process_params.urn_base_types = splitted[1];
    //   }else if(
    //     splitted[0] === 'urn_repo'
    //     && typeof splitted[1] === 'string'
    //     && splitted[1] !== ''
    //   ){
    //     process_params.urn_repo = splitted[1];
    //   }
    // }
}
function _generate_uranio_schema_text(trx_schema) {
    const txt = _generate_adm_schema_text();
    const split_text = 'export {};/** --uranio-generate-end */';
    const data_splitted = trx_schema.split(split_text);
    let new_data = '';
    new_data += data_splitted[0];
    new_data += txt;
    +'\n\n';
    new_data += split_text;
    new_data += data_splitted[1];
    return new_data;
}
function _generate_adm_schema_text() {
    // const atom_book = book.get_all_definitions();
    const txt = '';
    return txt;
}
// function _generate_hooks_text_server(trx_hooks:string){
// 	let text = '';
// 	text += trx_hooks;
// 	return text;
// }
// function _generate_hooks_text_client(trx_hooks:string){
// 	let text = '';
// 	text += trx_hooks;
// 	return text;
// }
//# sourceMappingURL=generate.js.map