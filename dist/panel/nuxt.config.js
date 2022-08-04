"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const urn_lib_1 = require("urn-lib");
const toml_1 = require("../client/toml");
const is_production = process.env.NODE_ENV === 'production';
const server_host = (is_production) ? toml_1.client_toml.panel_domain : toml_1.client_toml.dev_panel_domain;
const server_port = (is_production) ? toml_1.client_toml.panel_port : toml_1.client_toml.dev_panel_port;
const target = (is_production) ? toml_1.client_toml.service_url : toml_1.client_toml.dev_service_url;
const https = (process.env.URN_HTTPS === true) ? {
    // cert: fs.readFileSync(resolve(__dirname, '../../cert/localhost.crt')),
    // key: fs.readFileSync(resolve(__dirname, '../../cert/localhost.key'))
    cert: fs_1.default.readFileSync(process.env.URN_SSL_CERTIFICATE),
    key: fs_1.default.readFileSync(process.env.URN_SSL_KEY)
} : {};
exports.default = {
    dev: !is_production,
    buildDir: path_1.resolve(__dirname, './.nuxt'),
    srcDir: path_1.resolve(__dirname, '../../src/nuxt/'),
    target: 'static',
    ssr: false,
    generate: {
        dir: path_1.resolve(__dirname, '../_admin'),
        fallback: '404.html',
        subFolders: false,
        exclude: ['/urn-admin'],
    },
    server: {
        host: server_host || "0.0.0.0",
        port: server_port || 5454,
        https: https
    },
    proxy: {
        '/uranio/api': {
            target: target,
            secure: (is_production && process.env.URN_HTTPS === true),
            pathRewrite: {
                "^/uranio/api": ""
            }
        }
    },
    modules: [
        '@nuxtjs/proxy'
    ],
    buildModules: [
        '@nuxtjs/style-resources',
        '@nuxt/typescript-build',
    ],
    typescript: {
        configFile: path_1.resolve(__dirname, '../../tsconfig.json'),
        typeCheck: false
    },
    plugins: [
        {
            src: '~/plugins/uranio'
        }
    ],
    telemetry: false,
    alias: {
        'uranio/client': path_1.resolve(__dirname, '../../src/client'),
        'uranio-trx/client': path_1.resolve(__dirname, '../../../uranio-trx/dist/client'),
        'uranio-trx/client/types': path_1.resolve(__dirname, '../../../uranio-trx/dist/client/types'),
        'uranio-api/client': path_1.resolve(__dirname, '../../../uranio-api/dist/client'),
        'uranio-api/client/types': path_1.resolve(__dirname, '../../../uranio-api/dist/client/types'),
        'uranio-core/client': path_1.resolve(__dirname, '../../../uranio-core/dist/client'),
        'uranio-core/client/types': path_1.resolve(__dirname, '../../../uranio-core/dist/client/types'),
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
        URN_LOG_LEVEL: process.env.URN_LOG_LEVEL || urn_lib_1.urn_log.LogLevel.ERROR
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
        path_1.resolve(__dirname, '../../../uranio-schema/dist')
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
            before() {
                // console.log('BEFORE BUILD');
            },
            compile() {
                // console.log('BEFORE COMPILE');
            },
            compiled() {
                // console.log('╭────────────────────────────────────────────╮');
                // console.log('│                                            │');
                // console.log('│ Client listening on http://localhost:5454  │');
                // console.log('│                                            │');
                // console.log('╰────────────────────────────────────────────╯');
            }
        }
    }
};
//# sourceMappingURL=nuxt.config.js.map