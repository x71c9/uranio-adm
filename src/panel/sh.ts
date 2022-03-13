#!/usr/bin/env node
/**
 *
 * Entrypoint for binary command `uranio-panel-adm`
 *
 * This command runs `ts-node` of the NOT compiled script ./src/panel/index.ts
 * This is because Nuxt must be compiled from Typescript.
 *
 * Running ./dist/panel/index.js would be wrong since the compilation of
 * the typescipt module and components must be done by the
 * BuildModule: @nuxt/typescript-build
 *
 * @packageDocumentation
 */

import * as cp from 'child_process';

import minimist from 'minimist';

import {urn_log} from 'urn-lib';
urn_log.init({
	log_level: urn_log.LogLevel.DEBUG,
	debug_info: false
});

const args = minimist(process.argv.slice(2));

const cmd = `yarn ts-node ./src/panel/index.ts ${args._.join(' ')}`;

const child = cp.spawn(cmd, {shell:true, detached: true, stdio: "inherit"});

// cp.execSync(cmd);

// if(child.stdout){
//   child.stdout.setEncoding('utf8');
//   child.stdout.on('data', (chunk) => {
//     process.stdout.write(chunk);
//     // if(_clean_chunk(chunk) === '' || _clean_chunk(chunk) === '\n' || _clean_chunk(chunk) === '\r'){
//     //   return;
//     // }
//     // urn_log.debug(_clean_chunk(chunk));
//   });
// }

// if(child.stderr){
//   child.stderr.setEncoding('utf8');
//   child.stderr.on('data', (chunk) => {
//     process.stdout.write(chunk);
//     // if(_clean_chunk(chunk) === '' || _clean_chunk(chunk) === '\n'){
//     //   return;
//     // }
//     // urn_log.debug(_clean_chunk(chunk));
//   });
// }

child.on('error', (err) => {
	// process.stderr.write(err.message);
	urn_log.error(err.message);
});

child.on('close', (code) => {
	switch(code){
		case 0:{
			// process.stdout.write(`Closed with code ${code}\n`);
			urn_log.debug(`Closed with code ${code}`);
			break;
		}
		default:{
			// process.stderr.write(`Error on: ${cmd}\n`);
			// process.stderr.write(`Child process exited with code ${code}\n`);
			urn_log.error(`Error on: ${cmd}`);
			urn_log.error(`Child process exited with code ${code}`);
		}
	}
});

// function _clean_chunk(chunk:string){
//   // const plain_text = chunk
//   //   .toString()
//   //   .replace(/\x1B[[(?);]{0,2}(;?\d)*./g, '') // eslint-disable-line no-control-regex
//   //   .replace(/\r?\n|\r/g, ' ');
//   // return plain_text;
//   return chunk;
// }
