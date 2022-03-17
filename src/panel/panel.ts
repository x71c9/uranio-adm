/**
 * Panel module
 *
 * @packageDocumentation
 */

import path from 'path';

import chokidar from 'chokidar';

import express from 'express';

import {Nuxt, Builder, Generator} from 'nuxt';

import {urn_log} from 'urn-lib';

import config from './nuxt.config';

const nuxt = new Nuxt(config);

export async function build():Promise<typeof Builder>{
	
	urn_log.debug(`Uranio panel building started...`);
	
	await nuxt.ready();
	
	const builder = new Builder(nuxt);
	await builder.build();
	
	urn_log.debug(`Uranio panel build completed.`);
	
	return builder;
}

export async function generate(){
	
	urn_log.debug(`Uranio panel generating started...`);
	
	await nuxt.ready();
	const builder = new Builder(nuxt);
	const generator = new Generator(nuxt, builder);
	await generator.generate({ build: true, init: false });
	
	urn_log.debug(`Uranio panel generating completed.`);
	
}

export async function dev(){
	
	urn_log.debug(`Uranio panel dev started...`);
	
	await nuxt.ready();
	const builder = await build();
	await start();
	
	const watch_paths:string[] = [
		path.resolve(__dirname, '../../src/nuxt'),
		// path.resolve(__dirname, '../../../uranio-schema')
	];
	
	chokidar.watch(watch_paths, {ignoreInitial: true})
		.on('ready', () => {
			urn_log.debug(`Uranio panel dev watching ready...`);
		})
		.on('all', async (_event:string, _path:string) => {
			urn_log.debug(`Uranio panel dev watching [${_event}] [${_path}]`);
			builder.build();
		});
}

export async function start(){
	
	urn_log.debug(`Uranio panel starting...`);
	
	await nuxt.ready();
	
	const app = express();
	app.use(nuxt.render);
	app.listen(config.server.port, config.server.host, () => {
		urn_log.debug(`Server listening on port ${config.server.port}...`);
		urn_log.debug(`Connect to http://${config.server.host}:${config.server.port}`);
		_listen_log(config.server.host, config.server.port);
	});
	
}

function _listen_log(host:string, port:number){
	const hosl = Array(host.length).fill('─').join('');
	const porl = Array(port.toString().length).fill('─').join('');
	const hoss = Array(host.length).fill(' ').join('');
	const pors = Array(port.toString().length).fill(' ').join('');
	urn_log.debug(`╭───────────────────────────${hosl}─${porl}──╮`);
	urn_log.debug(`│                           ${hoss} ${pors}  │`);
	urn_log.debug(`│ Panel listening on http://${host}:${port}  │`);
	urn_log.debug(`│                           ${hoss} ${pors}  │`);
	urn_log.debug(`╰───────────────────────────${hosl}─${porl}──╯`);
}


