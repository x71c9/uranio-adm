#!/usr/bin/env node
"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cp = __importStar(require("child_process"));
const minimist_1 = __importDefault(require("minimist"));
const urn_lib_1 = require("urn-lib");
urn_lib_1.urn_log.init({
    log_level: urn_lib_1.urn_log.LogLevel.DEBUG,
    debug_info: false
});
const args = minimist_1.default(process.argv.slice(2));
const cmd = `yarn ts-node ./src/panel/index.ts ${args._.join(' ')}`;
const child = cp.spawn(cmd, { shell: true, detached: true, stdio: "inherit" });
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
    urn_lib_1.urn_log.error(err.message);
});
child.on('close', (code) => {
    switch (code) {
        case 0: {
            // process.stdout.write(`Closed with code ${code}\n`);
            urn_lib_1.urn_log.debug(`Closed with code ${code}`);
            break;
        }
        default: {
            // process.stderr.write(`Error on: ${cmd}\n`);
            // process.stderr.write(`Child process exited with code ${code}\n`);
            urn_lib_1.urn_log.error(`Error on: ${cmd}`);
            urn_lib_1.urn_log.error(`Child process exited with code ${code}`);
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
//# sourceMappingURL=sh.js.map