/**
 * Generate module
 *
 * @packageDocumentation
 */

// import fs from 'fs';

import trx from 'uranio-trx';

import {urn_log} from 'urn-lib';

// import * as types from '../server/types';

import {ClientConfiguration} from '../typ/conf_cln';

// import {Configuration} from '../typ/conf';

// import * as conf from '../conf/server';

// const required_server_config_client:Array<keyof Configuration> = [
// ];

export const process_params = {
	urn_command: `schema`,
	// urn_hook_types_path: `./node_modules/uranio-trx/dist/hooks/types.d.ts`,
	// urn_hooks_path: `./node_modules/uranio/dist/hooks/hooks.ts`,
	// urn_output_dir: `.`,
	// urn_repo: 'adm'
};

export function schema():string{
	urn_log.debug('Started generating uranio adm schema...');
	init();
	const trx_schema = trx.util.generate.schema();
	const text = _generate_uranio_schema_text(trx_schema);
	urn_log.debug(`ADM Schema generated.`);
	return text;
}

export function schema_and_save():void{
	const text = schema();
	save_schema(text);
	urn_log.debug(`Schema generated and saved.`);
}

export function save_schema(text:string):void{
	return trx.util.generate.save_schema(text);
}

// export function hooks_server():string{
// 	urn_log.debug('Started generating uranio adm server hooks...');
// 	init();
// 	const trx_hooks = trx.util.generate.hooks_server();
// 	const text = _generate_hooks_text_server(trx_hooks);
// 	urn_log.debug(`ADM Server Hooks generated.`);
// 	return text;
// }

// export function hooks_client():string{
// 	urn_log.debug('Started generating uranio adm client hooks...');
// 	init();
// 	const trx_hooks = trx.util.generate.hooks_client();
// 	const text = _generate_hooks_text_client(trx_hooks);
// 	urn_log.debug(`ADM Client Hooks generated.`);
// 	return text;
// }

export function hooks_and_save():void{
	// const hooks_text_server = hooks_server();
	// const hooks_text_client = hooks_client();
	// save_hooks_server(hooks_text_server);
	// save_hooks_client(hooks_text_client);
	trx.util.generate.hooks_and_save();
	urn_log.debug(`ADM Hooks generated and saved.`);
}

export function save_hooks_server(text:string):void{
	trx.util.generate.save_hooks_server(text);
}

export function save_hooks_client(text:string):void{
	trx.util.generate.save_hooks_client(text);
}

export function hook_types():string{
	urn_log.debug('Started generating uranio hook types...');
	init();
	const text = trx.util.generate.hook_types();
	urn_log.debug(`ADM Hook types generated.`);
	return text;
}

export function hook_types_and_save():void{
	const text = hook_types();
	save_hook_types(text);
	urn_log.debug(`Types generated and saved.`);
}

export function save_hook_types(text:string):void{
	return trx.util.generate.save_hook_types(text);
	// const output = `${process_params.urn_output_dir}/uranio-trx.d.ts`;
	// fs.writeFileSync(
	//   output,
	//   text
	// );
	// urn_log.debug(`Types saved in [${output}].`);
}

export function client_config(client_default:Required<ClientConfiguration>):string{
	urn_log.debug('Started generating uranio adm client config...');
	init();
	// const all_server_conf = conf.get_all();
	// for(const reqkey of required_server_config_client){
	//   (client_default as any)[`__server_${reqkey}`] = all_server_conf[reqkey];
	// }
	const text = trx.util.generate.client_config(client_default);
	urn_log.debug(`ADM client config generated.`);
	return text;
}

export function client_config_and_save(client_default:Required<ClientConfiguration>):void{
	const text = client_config(client_default);
	save_client_config(text);
	urn_log.debug(`ADM Client config generated and saved.`);
}

export function save_client_config(text:string):void{
	trx.util.generate.save_client_config(text);
}

export function init():void{
	trx.util.generate.init();
	// process_params.urn_base_schema = trx.util.generate.process_params.urn_base_schema;
	process_params.urn_command = trx.util.generate.process_params.urn_command;
	// process_params.urn_output_dir = trx.util.generate.process_params.urn_output_dir;
	// process_params.urn_hook_types_path = trx.util.generate.process_params.urn_hook_types_path;
	_init_adm_generate();
}

function _init_adm_generate(){
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

function _generate_uranio_schema_text(trx_schema:string){
	const txt = _generate_adm_schema_text();
	const split_text = 'export {};/** --uranio-generate-end */';
	const data_splitted = trx_schema.split(split_text);
	let new_data = '';
	new_data += data_splitted[0];
	new_data += txt; + '\n\n';
	new_data += split_text;
	new_data += data_splitted[1];
	return new_data;
}

function _generate_adm_schema_text(){
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

