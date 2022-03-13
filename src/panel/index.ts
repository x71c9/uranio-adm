/**
 * Admin binary entrypoint for uranio-panel-adm
 *
 * @packageDocumentation
 */

import dotenv from 'dotenv';
const result = dotenv.config();

if(result.error){
	throw result.error;
}

import minimist from 'minimist';

import {urn_log} from 'urn-lib';
urn_log.init({
	log_level: 4,
	debug_info: false
});

import * as panel from './panel';

const args = minimist(process.argv.slice(2));

switch(args._[0]){
	case 'start':{
		panel.start();
		break;
	}
	case 'build':{
		panel.build();
		break;
	}
	case 'generate':{
		panel.generate();
		break;
	}
	case 'dev':{
		panel.dev();
		break;
	}
	default:{
		urn_log.error(
			`Missing command. Run with one of the following: [start, build, generate, dev].`
		);
	}
}
