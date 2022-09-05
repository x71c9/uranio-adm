"use strict";
/**
 * Panel module
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = exports.dev = exports.generate = exports.build = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const chokidar_1 = __importDefault(require("chokidar"));
const express_1 = __importDefault(require("express"));
const nuxt_1 = require("nuxt");
const uranio_utils_1 = require("uranio-utils");
const nuxt_config_1 = __importDefault(require("./nuxt.config"));
const nuxt = new nuxt_1.Nuxt(nuxt_config_1.default);
async function build(dev = false) {
    uranio_utils_1.urn_log.debug(`Uranio panel building started...`);
    await nuxt.ready();
    const builder = new nuxt_1.Builder(nuxt);
    await builder.build();
    uranio_utils_1.urn_log.debug(`Uranio panel build completed.`);
    if (dev === false) {
        process.exit(0);
    }
    return builder;
}
exports.build = build;
async function generate() {
    uranio_utils_1.urn_log.debug(`Uranio panel generating started...`);
    await nuxt.ready();
    const builder = new nuxt_1.Builder(nuxt);
    const generator = new nuxt_1.Generator(nuxt, builder);
    await generator.generate({ build: true, init: false });
    uranio_utils_1.urn_log.debug(`Uranio panel generating completed.`);
}
exports.generate = generate;
async function dev() {
    uranio_utils_1.urn_log.debug(`Uranio panel dev started...`);
    await nuxt.ready();
    const builder = await build(true);
    await start(true);
    const watch_paths = [
        path_1.default.resolve(__dirname, '../../src/nuxt'),
        // path.resolve(__dirname, '../../../uranio-schema')
    ];
    chokidar_1.default.watch(watch_paths, { ignoreInitial: true })
        .on('ready', () => {
        uranio_utils_1.urn_log.debug(`Uranio panel dev watching ready...`);
    })
        .on('all', async (_event, _path) => {
        uranio_utils_1.urn_log.debug(`Uranio panel dev watching [${_event}] [${_path}]`);
        builder.build();
    });
}
exports.dev = dev;
async function start(dev = false) {
    var _a, _b;
    uranio_utils_1.urn_log.debug(`Uranio panel starting...`);
    // await build();
    if (dev === false) {
        await generate();
    }
    await nuxt.ready();
    const app = (0, express_1.default)();
    app.use(nuxt.render);
    // const protocol = (process.env.URN_HTTPS) ? 'https' : 'http';
    const protocol = (typeof ((_b = (_a = nuxt_config_1.default.server) === null || _a === void 0 ? void 0 : _a.https) === null || _b === void 0 ? void 0 : _b.cert) !== 'undefined') ?
        'https' : 'http';
    let server = http_1.default.createServer(app);
    if (protocol === 'https') {
        const serverOptions = {
            // Certificate(s) & Key(s)
            // cert: fs.readFileSync(path.join(__dirname, '../../../cert/cert.pem')),
            // key: fs.readFileSync(path.join(__dirname, '../../../cert/key.pem')),
            cert: fs_1.default.readFileSync(process.env.URN_SSL_CERTIFICATE),
            key: fs_1.default.readFileSync(process.env.URN_SSL_KEY),
            // TLS Versions
            // maxVersion: 'TLSv1.3',
            // minVersion: 'TLSv1.2'
            // Hardened configuration
            // ciphers: 'TLS_AES_256_GCM_SHA384:TLS_AES_128_GCM_SHA256',
            // ecdhCurve: 'P-521:P-384',
            // sigalgs: 'ecdsa_secp384r1_sha384',
            // Attempt to use server cipher suite preference instead of clients
            // honorCipherOrder: true
        };
        server = https_1.default.createServer(serverOptions, app);
    }
    // server.listen(config.server.port, config.server.host, () => {
    server.listen(nuxt_config_1.default.server.port, () => {
        uranio_utils_1.urn_log.debug(`Server listening on port ${nuxt_config_1.default.server.port}...`);
        uranio_utils_1.urn_log.debug(`Connect to ${protocol}://${nuxt_config_1.default.server.host}:${nuxt_config_1.default.server.port}`);
        _listen_log(protocol, nuxt_config_1.default.server.host, nuxt_config_1.default.server.port);
    });
}
exports.start = start;
function _listen_log(prot, host, port) {
    const prol = Array(prot.length).fill('─').join('');
    const hosl = Array(host.length).fill('─').join('');
    const porl = Array(port.toString().length).fill('─').join('');
    const pros = Array(prot.length).fill(' ').join('');
    const hoss = Array(host.length).fill(' ').join('');
    const pors = Array(port.toString().length).fill(' ').join('');
    uranio_utils_1.urn_log.info(`╭────────────────────${prol}───${hosl}─${porl}──╮`);
    uranio_utils_1.urn_log.info(`│                    ${pros}   ${hoss} ${pors}  │`);
    uranio_utils_1.urn_log.info(`│ Panel listening on ${prot}://${host}:${port}  │`);
    uranio_utils_1.urn_log.info(`│                    ${pros}   ${hoss} ${pors}  │`);
    uranio_utils_1.urn_log.info(`╰────────────────────${prol}───${hosl}─${porl}──╯`);
}
//# sourceMappingURL=panel.js.map