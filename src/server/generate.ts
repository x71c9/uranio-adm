#!/usr/bin/env node

/**
 * Adm generate module
 *
 * @packageDocumentation
 */

import dotenv from 'dotenv';
const result = dotenv.config();

if(result.error){
	throw result.error;
}

export * from './register';

import * as uranio from './main';
uranio.init({
	connect_on_init: false,
	superuser_create_on_init: false
});

import * as util from '../util/server';

let urn_command = 'all';

for(const argv of process.argv){
	const splitted = argv.split('=');
	if(
		splitted[0] === 'urn_command'
		&& typeof splitted[1] === 'string'
		&& splitted[1] !== ''
	){
		urn_command = splitted[1];
	}
}

switch(urn_command){
	case 'schema':{
		util.generate.schema_and_save();
		break;
	}
	case 'hooks':{
		// util.generate.hooks_and_save('trx');
		util.generate.hooks_and_save();
		break;
	}
	case 'hook-types':{
		util.generate.hook_types_and_save();
		break;
	}
	case 'client-config':{
		util.generate.client_config_and_save(uranio.conf.get_all());
		break;
	}
	default:{
		util.generate.schema_and_save();
		util.generate.hooks_and_save();
		util.generate.hook_types_and_save();
		util.generate.client_config_and_save(uranio.conf.get_all());
		break;
	}
}
