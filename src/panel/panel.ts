/**
 * Panel module
 *
 * @packageDocumentation
 */

import path from 'path';

import fs from 'fs';

import http from 'http';

import https from 'https';

import chokidar from 'chokidar';

import express from 'express';

import {Nuxt, Builder, Generator} from 'nuxt';

import {urn_log} from 'urn-lib';

import config from './nuxt.config';

const nuxt = new Nuxt(config);

export async function build(dev=false):Promise<typeof Builder>{
	
	urn_log.debug(`Uranio panel building started...`);
	
	await nuxt.ready();
	
	const builder = new Builder(nuxt);
	await builder.build();
	
	urn_log.debug(`Uranio panel build completed.`);
	
	if(dev === false){
		process.exit(0);
	}
	
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
	const builder = await build(true);
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
	
	// await build();
	await generate();
	await nuxt.ready();
	
	const app = express();
	app.use(nuxt.render);
	
	const protocol = (process.env.URN_HTTPS) ? 'https' : 'http';
	
	let server = http.createServer(app);
	if(protocol === 'https'){
		const serverOptions = {
			// Certificate(s) & Key(s)
			// cert: fs.readFileSync(path.join(__dirname, '../../../cert/cert.pem')),
			// key: fs.readFileSync(path.join(__dirname, '../../../cert/key.pem')),
			cert: fs.readFileSync(process.env.URN_SSL_CERTIFICATE as string),
			key: fs.readFileSync(process.env.URN_SSL_KEY as string),
			// TLS Versions
			// maxVersion: 'TLSv1.3',
			// minVersion: 'TLSv1.2'
			// Hardened configuration
			// ciphers: 'TLS_AES_256_GCM_SHA384:TLS_AES_128_GCM_SHA256',
			// ecdhCurve: 'P-521:P-384',
			// sigalgs: 'ecdsa_secp384r1_sha384',
			// Attempt to use server cipher suite preference instead of clients
			// honorCipherOrder: true
		}
		server = https.createServer(serverOptions, app);
	}
	
	server.listen(config.server.port, config.server.host, () => {
		urn_log.debug(`Server listening on port ${config.server.port}...`);
		urn_log.debug(`Connect to ${protocol}://${config.server.host}:${config.server.port}`);
		_listen_log(protocol, config.server.host, config.server.port);
	});
	
}

function _listen_log(prot:string, host:string, port:number){
	const prol = Array(prot.length).fill('─').join('');
	const hosl = Array(host.length).fill('─').join('');
	const porl = Array(port.toString().length).fill('─').join('');
	
	const pros = Array(prot.length).fill(' ').join('');
	const hoss = Array(host.length).fill(' ').join('');
	const pors = Array(port.toString().length).fill(' ').join('');
	
	urn_log.debug(`╭────────────────────${prol}───${hosl}─${porl}──╮`);
	urn_log.debug(`│                    ${pros}   ${hoss} ${pors}  │`);
	urn_log.debug(`│ Panel listening on ${prot}://${host}:${port}  │`);
	urn_log.debug(`│                    ${pros}   ${hoss} ${pors}  │`);
	urn_log.debug(`╰────────────────────${prol}───${hosl}─${porl}──╯`);
}


