/**
 * Adm generate module
 *
 * @packageDocumentation
 */

import {urn_log} from 'urn-lib';
urn_log.init({
	log_level: urn_log.LogLevel.FUNCTION_DEBUG,
	debug_info: false
});

// export * from './register';

import uranio from '../server';
uranio.init();

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
		util.generate.hooks_and_save('adm');
		break;
	}
	case 'hook-types':{
		util.generate.hook_types_and_save();
		break;
	}
	default:{
		util.generate.schema_and_save();
		util.generate.hooks_and_save('adm');
		util.generate.hook_types_and_save();
		break;
	}
}
