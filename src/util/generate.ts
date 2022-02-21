/**
 * Generate module
 *
 * @packageDocumentation
 */

import fs from 'fs';

import trx from 'uranio-trx';

import {urn_log} from 'urn-lib';

export const process_params = {
	urn_command: `schema`,
	urn_base_schema: `./.uranio/generate/base/schema.d.ts`,
	urn_base_types: `./.uranio/generate/base/uranio-trx.d.ts`,
	urn_output_dir: `.`,
	urn_repo: 'adm'
};

export function schema():string{
	urn_log.debug('Started generating uranio trx schema...');
	init();
	const trx_schema = trx.util.generate.schema();
	const text = _generate_uranio_schema_text(trx_schema);
	urn_log.debug(`TRX Schema generated.`);
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

export function hooks():string{
	urn_log.debug('Started generating uranio trx hooks...');
	init();
	const trx_hooks = trx.util.generate.hooks();
	const text = _generate_hooks_text(trx_hooks);
	urn_log.debug(`TRX Hooks generated.`);
	return text;
}

export function hooks_and_save():void{
	const text = hooks();
	save_hooks(text);
	urn_log.debug(`Hooks generated and saved.`);
}

export function save_hooks(text:string):void{
	const output = `${process_params.urn_output_dir}/__urn_hooks.ts`;
	fs.writeFileSync(
		output,
		text
	);
	urn_log.debug(`Hooks saved in [${output}.`);
}

export function trx_types():string{
	urn_log.debug('Started generating uranio trx types...');
	init();
	const text = trx.util.generate.types();
	urn_log.debug(`ADM TRX Types generated.`);
	return text;
}

export function trx_types_and_save():void{
	const text = trx_types();
	save_trx_types(text);
	urn_log.debug(`Types generated and saved.`);
}

export function save_trx_types(text:string):void{
	const output = `${process_params.urn_output_dir}/uranio-trx.d.ts`;
	fs.writeFileSync(
		output,
		text
	);
	urn_log.debug(`Types saved in [${output}].`);
}

export function init():void{
	trx.util.generate.init();
	process_params.urn_base_schema = trx.util.generate.process_params.urn_base_schema;
	process_params.urn_command = trx.util.generate.process_params.urn_command;
	process_params.urn_output_dir = trx.util.generate.process_params.urn_output_dir;
	_init_trx_generate();
}

function _init_trx_generate(){
	for(const argv of process.argv){
		const splitted = argv.split('=');
		if(
			splitted[0] === 'urn_base_types'
			&& typeof splitted[1] === 'string'
			&& splitted[1] !== ''
		){
			process_params.urn_base_types = splitted[1];
		}else if(
			splitted[0] === 'urn_repo'
			&& typeof splitted[1] === 'string'
			&& splitted[1] !== ''
		){
			process_params.urn_repo = splitted[1];
		}
	}
}

function _generate_uranio_schema_text(trx_schema:string){
	const txt = _generate_adm_schema_text();
	const split_text = '\texport {};/** --uranio-generate-end */index';
	const data_splitted = trx_schema.split(split_text);
	let new_data = '';
	new_data += data_splitted[0];
	new_data += txt; + '\n\n\t';
	new_data += split_text;
	new_data += data_splitted[1];
	return new_data;
}

function _generate_adm_schema_text(){
	// const atom_book = book.get_all_definitions();
	const txt = '';
	return txt;
}

function _generate_hooks_text(trx_hooks:string){
	let text = '';
	text += trx_hooks;
	return text;
}

