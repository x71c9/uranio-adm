#!/usr/bin/env node

/**
 * Admin binary entrypoint for uranio-panel-adm
 *
 * This file is compiled in dist/panel/index.js
 * The compiled file is the entry point for the binary command
 * uranio-panel-adm
 *
 * Important notice is to keep nuxt.config.js
 * pointing the typescript folder src/nuxt and not dist/nuxt
 * that would have compiled files.
 *
 * Nuxt will do the compilation itself with the buildModule:
 * @nuxt/typescript-build
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
// urn_log.defaults.prefix_loglevel = false;

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
