#!/usr/bin/env node
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
export {};
