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

import { resolve } from 'path';

import {client_toml} from '../client/toml';

const is_production = process.env.NODE_ENV === 'production';

const server_host = (is_production) ? client_toml.panel_domain : client_toml.dev_panel_domain;
const server_port = (is_production) ? client_toml.panel_port : client_toml.dev_panel_port;
const target = (is_production) ? client_toml.service_url : client_toml.dev_service_url;

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
		host: server_host || "0.0.0.0",
		port: server_port || 5454
	},
	proxy: {
		'/uranio/api': {
			target: target,
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
		typeCheck: true
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
	},
	components: [
		{
			path: '~/components/',
			extensions: ['vue']
		}
	],
	router: {
		trailingSlash: false,
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