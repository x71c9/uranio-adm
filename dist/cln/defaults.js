"use strict";
/**
 * Module for default client configuration object
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.adm_client_config = void 0;
const defaults_1 = require("uranio-trx/cln/defaults");
/**
 * IMPORTANT: if new variable are added here they must be added on
 * uranio-trx/conf/client.ts
 *
 * Unfortunately the browser doesn't allow to dynamically access process.env
 * properties, like process.env[var_name] where `var_name` is a variable.
 */
exports.adm_client_config = {
    ...defaults_1.trx_client_config
};
//# sourceMappingURL=defaults.js.map