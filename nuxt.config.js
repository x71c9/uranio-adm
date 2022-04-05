/**
 * Nuxt configuration file for testing Nuxt in urn-adm
 *
 * @packageDocumentation
 */

import { resolve } from 'path';

export default {
	alias: {
		'uranio/client': resolve(__dirname, './src/client'),
		'uranio-trx/client': resolve(__dirname, './node_modules/uranio-trx/dist/client'),
		'uranio-trx/client/types': resolve(__dirname, './node_modules/uranio-trx/dist/client/types'),
		'uranio-api/client': resolve(__dirname, './node_modules/uranio-api/dist/client'),
		'uranio-api/client/types': resolve(__dirname, './node_modules/uranio-api/dist/client/types'),
		'uranio-core/client': resolve(__dirname, './node_modules/uranio-core/dist/client'),
		'uranio-core/client/types': resolve(__dirname, './node_modules/uranio-core/dist/client/types'),
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
	plugins: [
		{
			src: '~/plugins/uranio.ts'
		}
	],
	srcDir: './src/nuxt/',
	target: 'static',
	ssr: false,
	generate: {
		dir: './dist/admin',
		fallback: '404.html',
		subFolders: false,
		exclude: ['/urn-admin'],
	},
	server: {
		host: "0.0.0.0",
		port: 5454
	},
	modules:[
		'@nuxtjs/proxy'
	],
	build: {
		splitChunks: {
			layouts: true,
			pages: true,
		}
	},
	buildDir: './.nuxt',
	buildModules: [
		'@nuxt/typescript-build',
		'@nuxtjs/style-resources'
	],
	proxy: {
		'/uranio/api': {
			target: "http://localhost:7773/uranio/api",
			pathRewrite: {
				"^/uranio/api": ""
			}
		}
	},
	typescript: {
		typeCheck: true
	},
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
	telemetry: false,
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
