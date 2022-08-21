/**
 * Nuxt configuration file for programmatically use Nuxt.
 *
 * This file is compiled to dist/panel/nuxt.config.js
 * but must point the srcDir to the typescript folder
 * because the compilation of all the Nuxt modules
 * must be done by the Nuxt buildModule:
 * @nuxt/typescript-build
 *
 * srcDir: resolve(__dirname,'../../src/nuxt/')
 *
 * @packageDocumentation
 */

import fs from 'fs';

import {resolve} from 'path';

import {urn_log} from 'urn-lib';

import {client_toml} from '../client/toml';

const is_production = process.env.NODE_ENV === 'production';

const panel_protocol = (!is_production && client_toml.dev_panel_protocol) ?
	client_toml.dev_panel_protocol : client_toml.panel_protocol;
const panel_domain = (!is_production && client_toml.dev_panel_domain) ?
	client_toml.dev_panel_domain : client_toml.panel_domain;
const panel_port = (!is_production && client_toml.dev_panel_port) ?
	client_toml.dev_panel_port : client_toml.panel_port;

const server_protocol = (!is_production && client_toml.dev_service_protocol) ?
	client_toml.dev_service_protocol : client_toml.service_protocol;
const server_domain = (!is_production && client_toml.dev_service_domain) ?
	client_toml.dev_service_domain : client_toml.service_domain;
const server_port = (!is_production && client_toml.dev_service_port) ?
	client_toml.dev_service_port : client_toml.service_port;
const prefix_api = (!is_production && client_toml.dev_prefix_api) ?
	client_toml.dev_prefix_api : client_toml.prefix_api;

const ssl_secure = (!is_production && typeof client_toml.dev_ssl_secure !== 'undefined') ?
	client_toml.dev_ssl_secure : client_toml.ssl_secure;

let target = `${server_protocol}://${server_domain}:${server_port}${prefix_api}`;

if(typeof client_toml.service_proxy === 'string' && client_toml.service_proxy){
	target = client_toml.service_proxy;
}
if(!is_production && typeof client_toml.dev_service_proxy === 'string' && client_toml.dev_service_proxy){
	target = client_toml.dev_service_proxy;
}

const https = (panel_protocol === 'https') ? {
	// cert: fs.readFileSync(resolve(__dirname, '../../cert/localhost.crt')),
	// key: fs.readFileSync(resolve(__dirname, '../../cert/localhost.key'))
	cert: fs.readFileSync(process.env.URN_SSL_CERTIFICATE),
	key: fs.readFileSync(process.env.URN_SSL_KEY)
} : {};

export default {
	dev: !is_production,
	buildDir: resolve(__dirname,'./.nuxt'),
	srcDir: resolve(__dirname,'../../src/nuxt/'),
	target: 'static',
	ssr: false,
	generate: {
		dir: resolve(__dirname,'../_admin'),
		fallback: '404.html',
		subFolders: false,
		exclude: ['/urn-admin'],
	},
	server: {
		host: panel_domain || "0.0.0.0",
		port: panel_port || 5454,
		https: https
	},
	proxy: {
		'/uranio/api': {
			target: target,
			secure: (ssl_secure === true),
			pathRewrite: {
				"^/uranio/api": ""
			}
		}
	},
	modules:[
		'@nuxtjs/proxy'
	],
	buildModules: [
		'@nuxtjs/style-resources',
		'@nuxt/typescript-build',
	],
	typescript: {
		configFile: resolve(__dirname, '../../tsconfig.json'),
		typeCheck: false
	},
	plugins: [
		{
			src: '~/plugins/uranio'
		}
	],
	telemetry: false,
	alias: {
		'uranio/client': resolve(__dirname, '../../src/client'),
		'uranio-trx/client': resolve(__dirname, '../../../uranio-trx/dist/client'),
		'uranio-trx/client/types': resolve(__dirname, '../../../uranio-trx/dist/client/types'),
		'uranio-api/client': resolve(__dirname, '../../../uranio-api/dist/client'),
		'uranio-api/client/types': resolve(__dirname, '../../../uranio-api/dist/client/types'),
		'uranio-core/client': resolve(__dirname, '../../../uranio-core/dist/client'),
		'uranio-core/client/types': resolve(__dirname, '../../../uranio-core/dist/client/types'),
	},
	env: {
		// URN_CLIENT_FETCH: process.env.URN_CLIENT_FETCH || 'axios',
		// URN_CLIENT_PROTOCOL: process.env.URN_CLIENT_PROTOCOL || 'http',
		// URN_CLIENT_DOMAIN: process.env.URN_CLIENT_DOMAIN || 'localhost',
		// URN_CLIENT_PORT: Number(process.env.URN_CLIENT_PORT) || 4444,
		// URN_CLIENT_PREFIX_LOG: process.env.URN_PREFIX_LOG || '/log',
		// URN_LOG_LEVEL: (process.env.NODE_ENV === 'production') ?
		// 	urn_log.LogLevel.ERROR : urn_log.LogLevel.FUNCTION_DEBUG,
		// URN_DEV_LOG_LEVEL: (process.env.NODE_ENV === 'production') ?
		// 	urn_log.LogLevel.ERROR : urn_log.LogLevel.FUNCTION_DEBUG
		URN_LOG_LEVEL: process.env.URN_LOG_LEVEL || urn_log.LogLevel.ERROR
	},
	components: [
		{
			path: '~/components/',
			extensions: ['vue']
		}
	],
	router: {
		middleware: ['init'],
		linkActiveClass: 'urn-active-link',
		linkExactActiveClass: 'urn-exact-active-link',
		parseQuery(q) {
			return require('qs').parse(q);
		},
		stringifyQuery(q) {
			const r = require('qs').stringify(q);
			return r ? '?' + r : '';
		},
	},
	loading: {
		color: '#2222FF',
		height: '2px',
		throttle: 200,
		duration: 2000,
		continuous: true
	},
	watch: [
		resolve(__dirname, '../../../uranio-schema/dist')
	],
	// watchers: {
	//   webpack: {
	//     ignored: [
	//       `${process.cwd()}/node_modules/**/*`,
	//       `${process.cwd()}/.uranio/server/**/*`,
	//       `${process.cwd()}/.uranio/.tmp/**/*`,
	//       `${process.cwd()}/src/**/*`,
	//       `${process.cwd()}/dist/**/*`,
	//     ]
	//   }
	// },
	hooks: {
		build: {
			before(){
				// console.log('BEFORE BUILD');
			},
			compile(){
				// console.log('BEFORE COMPILE');
			},
			compiled(){
				// console.log('╭────────────────────────────────────────────╮');
				// console.log('│                                            │');
				// console.log('│ Client listening on http://localhost:5454  │');
				// console.log('│                                            │');
				// console.log('╰────────────────────────────────────────────╯');
			}
		}
	}
};
