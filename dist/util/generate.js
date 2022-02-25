"use strict";
/**
 * Generate module
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.save_hook_types = exports.hook_types_and_save = exports.hook_types = exports.save_hooks = exports.hooks_and_save = exports.hooks = exports.save_schema = exports.schema_and_save = exports.schema = exports.process_params = void 0;
const fs_1 = __importDefault(require("fs"));
const uranio_trx_1 = __importDefault(require("uranio-trx"));
const urn_lib_1 = require("urn-lib");
exports.process_params = {
    urn_command: `schema`,
    urn_hook_types_path: `./node_modules/uranio-trx/dist/hooks/types.d.ts`,
    // urn_base_schema: `./.uranio/generate/base/schema.d.ts`,
    // urn_base_types: `./.uranio/generate/base/uranio-trx.d.ts`,
    urn_output_dir: `.`,
    urn_repo: 'adm'
};
function schema() {
    urn_lib_1.urn_log.debug('Started generating uranio trx schema...');
    init();
    const trx_schema = uranio_trx_1.default.util.generate.schema();
    const text = _generate_uranio_schema_text(trx_schema);
    urn_lib_1.urn_log.debug(`TRX Schema generated.`);
    return text;
}
exports.schema = schema;
function schema_and_save() {
    const text = schema();
    save_schema(text);
    urn_lib_1.urn_log.debug(`Schema generated and saved.`);
}
exports.schema_and_save = schema_and_save;
function save_schema(text) {
    return uranio_trx_1.default.util.generate.save_schema(text);
}
exports.save_schema = save_schema;
function hooks(repo) {
    urn_lib_1.urn_log.debug('Started generating uranio trx hooks...');
    init();
    const trx_hooks = uranio_trx_1.default.util.generate.hooks(repo);
    const text = _generate_hooks_text(trx_hooks);
    urn_lib_1.urn_log.debug(`TRX Hooks generated.`);
    return text;
}
exports.hooks = hooks;
function hooks_and_save(repo) {
    const text = hooks(repo);
    save_hooks(text);
    urn_lib_1.urn_log.debug(`Hooks generated and saved.`);
}
exports.hooks_and_save = hooks_and_save;
function save_hooks(text) {
    const output = `${exports.process_params.urn_output_dir}/__urn_hooks.ts`;
    fs_1.default.writeFileSync(output, text);
    urn_lib_1.urn_log.debug(`Hooks saved in [${output}.`);
}
exports.save_hooks = save_hooks;
function hook_types() {
    urn_lib_1.urn_log.debug('Started generating uranio hook types...');
    init();
    const text = uranio_trx_1.default.util.generate.hook_types();
    urn_lib_1.urn_log.debug(`ADM Hook types generated.`);
    return text;
}
exports.hook_types = hook_types;
function hook_types_and_save() {
    const text = hook_types();
    save_hook_types(text);
    urn_lib_1.urn_log.debug(`Types generated and saved.`);
}
exports.hook_types_and_save = hook_types_and_save;
function save_hook_types(text) {
    return uranio_trx_1.default.util.generate.save_hook_types(text);
    // const output = `${process_params.urn_output_dir}/uranio-trx.d.ts`;
    // fs.writeFileSync(
    //   output,
    //   text
    // );
    // urn_log.debug(`Types saved in [${output}].`);
}
exports.save_hook_types = save_hook_types;
function init() {
    uranio_trx_1.default.util.generate.init();
    // process_params.urn_base_schema = trx.util.generate.process_params.urn_base_schema;
    exports.process_params.urn_command = uranio_trx_1.default.util.generate.process_params.urn_command;
    exports.process_params.urn_output_dir = uranio_trx_1.default.util.generate.process_params.urn_output_dir;
    exports.process_params.urn_hook_types_path = uranio_trx_1.default.util.generate.process_params.urn_hook_types_path;
    _init_adm_generate();
}
exports.init = init;
function _init_adm_generate() {
    // for(const argv of process.argv){
    //   const splitted = argv.split('=');
    //   if(
    //     splitted[0] === 'urn_base_types'
    //     && typeof splitted[1] === 'string'
    //     && splitted[1] !== ''
    //   ){
    //     process_params.urn_base_types = splitted[1];
    //   }else if(
    //     splitted[0] === 'urn_repo'
    //     && typeof splitted[1] === 'string'
    //     && splitted[1] !== ''
    //   ){
    //     process_params.urn_repo = splitted[1];
    //   }
    // }
}
function _generate_uranio_schema_text(trx_schema) {
    const txt = _generate_adm_schema_text();
    const split_text = 'export {};/** --uranio-generate-end */index';
    const data_splitted = trx_schema.split(split_text);
    let new_data = '';
    new_data += data_splitted[0];
    new_data += txt;
    +'\n\n';
    new_data += split_text;
    new_data += data_splitted[1];
    return new_data;
}
function _generate_adm_schema_text() {
    // const atom_book = book.get_all_definitions();
    const txt = '';
    return txt;
}
function _generate_hooks_text(trx_hooks) {
    let text = '';
    text += trx_hooks;
    return text;
}
//# sourceMappingURL=generate.js.map