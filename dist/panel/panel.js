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
const chokidar_1 = __importDefault(require("chokidar"));
const express_1 = __importDefault(require("express"));
const nuxt_1 = require("nuxt");
const urn_lib_1 = require("urn-lib");
const nuxt_config_1 = __importDefault(require("./nuxt.config"));
const nuxt = new nuxt_1.Nuxt(nuxt_config_1.default);
async function build() {
    urn_lib_1.urn_log.debug(`Uranio panel building started...`);
    await nuxt.ready();
    const builder = new nuxt_1.Builder(nuxt);
    await builder.build();
    urn_lib_1.urn_log.debug(`Uranio panel build completed.`);
    return builder;
}
exports.build = build;
async function generate() {
    urn_lib_1.urn_log.debug(`Uranio panel generating started...`);
    await nuxt.ready();
    const builder = new nuxt_1.Builder(nuxt);
    const generator = new nuxt_1.Generator(nuxt, builder);
    await generator.generate({ build: true, init: false });
    urn_lib_1.urn_log.debug(`Uranio panel generating completed.`);
}
exports.generate = generate;
async function dev() {
    urn_lib_1.urn_log.debug(`Uranio panel dev started...`);
    await nuxt.ready();
    const builder = await build();
    await start();
    const watch_paths = [
        path_1.default.resolve(__dirname, '../nuxt')
    ];
    chokidar_1.default.watch(watch_paths, { ignoreInitial: true })
        .on('ready', () => {
        urn_lib_1.urn_log.debug(`Uranio panel dev watching ready...`);
    })
        .on('all', async (_path, _event) => {
        urn_lib_1.urn_log.debug(`Uranio panel dev watching [${_event}] [${_path}]`);
        builder.build();
    });
}
exports.dev = dev;
async function start() {
    urn_lib_1.urn_log.debug(`Uranio panel starting...`);
    await nuxt.ready();
    const app = express_1.default();
    app.use(nuxt.render);
    app.listen(nuxt_config_1.default.server.port, nuxt_config_1.default.server.host, () => {
        urn_lib_1.urn_log.debug(`Server listening on port ${nuxt_config_1.default.server.port}...`);
        urn_lib_1.urn_log.debug(`Connect to http://${nuxt_config_1.default.server.host}:${nuxt_config_1.default.server.port}`);
        _listen_log(nuxt_config_1.default.server.host, nuxt_config_1.default.server.port);
    });
}
exports.start = start;
function _listen_log(host, port) {
    const hosl = Array(host.length).fill('─').join('');
    const porl = Array(port.toString().length).fill('─').join('');
    const hoss = Array(host.length).fill(' ').join('');
    const pors = Array(port.toString().length).fill(' ').join('');
    urn_lib_1.urn_log.debug(`╭───────────────────────────${hosl}─${porl}──╮`);
    urn_lib_1.urn_log.debug(`│                           ${hoss} ${pors}  │`);
    urn_lib_1.urn_log.debug(`│ Panel listening on http://${host}:${port}  │`);
    urn_lib_1.urn_log.debug(`│                           ${hoss} ${pors}  │`);
    urn_lib_1.urn_log.debug(`╰───────────────────────────${hosl}─${porl}──╯`);
}
//# sourceMappingURL=panel.js.map