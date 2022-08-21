#!/usr/bin/env node
"use strict";
/**
 * Admin binary entrypoint for uranio-panel-adm
 *
 * This file is compiled in dist/panel/index.js
 * The compiled file is the entry point for the binary command
 * uranio-panel-adm
 *
 * Important notice is to keep nuxt.config.js
 * pointing the typescript folder src/nuxt and not dist/nuxt
 * that would have compiled files.
 *
 * Nuxt will do the compilation itself with the buildModule:
 * @nuxt/typescript-build
 *
 * @packageDocumentation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const dotenv_1 = __importDefault(require("dotenv"));
const result = dotenv_1.default.config();
if (result.error) {
    throw result.error;
}
const minimist_1 = __importDefault(require("minimist"));
const urn_lib_1 = require("urn-lib");
urn_lib_1.urn_log.init({
    log_level: 4,
    debug_info: false
});
// urn_log.defaults.prefix_log_type = false;
const panel = __importStar(require("./panel"));
const args = (0, minimist_1.default)(process.argv.slice(2));
switch (args._[0]) {
    case 'start': {
        panel.start();
        break;
    }
    case 'build': {
        panel.build();
        break;
    }
    case 'generate': {
        panel.generate();
        break;
    }
    case 'dev': {
        panel.dev();
        break;
    }
    default: {
        urn_lib_1.urn_log.error(`Missing command. Run with one of the following: [start, build, generate, dev].`);
    }
}
//# sourceMappingURL=index.js.map