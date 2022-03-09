var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);
var toml_exports = {};
__export(toml_exports, {
  client_toml: () => client_toml
});
const client_toml = {
  service_url: "http://localhost:7777/uranio/api",
  service_dev_url: "http://localhost:7773/uranio/api",
  log_debug_info: false,
  log_color: false,
  log_time_format: "yyyy-mm-dd'T'HH:MM:ss:l",
  log_max_str_length: 174,
  log_prefix: "",
  log_prefix_type: false,
  log_dev_debug_info: false,
  log_dev_color: false,
  log_dev_time_format: "yyyy-mm-dd'T'HH:MM:ss:l",
  log_dev_max_str_length: 174,
  log_dev_prefix: "",
  log_dev_prefix_type: false
};
module.exports = __toCommonJS(toml_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  client_toml
});
