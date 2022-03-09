var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);
var hooks_exports = {};
__export(hooks_exports, {
  hooks: () => hooks
});
var auth = __toESM(require("../auth/server"));
var base = __toESM(require("../base/server"));
var media = __toESM(require("../media/server"));
let hook_token;
const hooks = {
  set_token: (token) => {
    hook_token = token;
  },
  get_token: () => {
    return hook_token;
  },
  superusers: {
    authenticate: async (email, password) => {
      return await auth.create("superuser").authenticate(email, password);
    },
    count: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("superuser", current_token).hook("count")(args);
    },
    find_one: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("superuser", current_token).hook("find_one")(args);
    },
    find: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("superuser", current_token).hook("find")(args);
    },
    find_id: async (id, parameters, token) => {
      const args = {
        params: {
          id
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("superuser", current_token).hook("find_id")(args);
    },
    insert: async (body, parameters, token) => {
      const args = {
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("superuser", current_token).hook("insert")(args);
    },
    update: async (id, body, parameters, token) => {
      const args = {
        params: {
          id
        },
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("superuser", current_token).hook("update")(args);
    },
    delete: async (id, parameters, token) => {
      const args = {
        params: {
          id
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("superuser", current_token).hook("delete")(args);
    },
    insert_multiple: async (body, parameters, token) => {
      const args = {
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("superuser", current_token).hook("insert_multiple")(args);
    },
    update_multiple: async (ids, body, parameters, token) => {
      const args = {
        params: {
          ids
        },
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("superuser", current_token).hook("update_multiple")(args);
    },
    delete_multiple: async (ids, parameters, token) => {
      const args = {
        params: {
          ids
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("superuser", current_token).hook("delete_multiple")(args);
    }
  },
  users: {
    authenticate: async (email, password) => {
      return await auth.create("user").authenticate(email, password);
    },
    count: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("user", current_token).hook("count")(args);
    },
    find_one: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("user", current_token).hook("find_one")(args);
    },
    find: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("user", current_token).hook("find")(args);
    },
    find_id: async (id, parameters, token) => {
      const args = {
        params: {
          id
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("user", current_token).hook("find_id")(args);
    },
    insert: async (body, parameters, token) => {
      const args = {
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("user", current_token).hook("insert")(args);
    },
    update: async (id, body, parameters, token) => {
      const args = {
        params: {
          id
        },
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("user", current_token).hook("update")(args);
    },
    delete: async (id, parameters, token) => {
      const args = {
        params: {
          id
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("user", current_token).hook("delete")(args);
    },
    insert_multiple: async (body, parameters, token) => {
      const args = {
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("user", current_token).hook("insert_multiple")(args);
    },
    update_multiple: async (ids, body, parameters, token) => {
      const args = {
        params: {
          ids
        },
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("user", current_token).hook("update_multiple")(args);
    },
    delete_multiple: async (ids, parameters, token) => {
      const args = {
        params: {
          ids
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("user", current_token).hook("delete_multiple")(args);
    }
  },
  groups: {
    count: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("group", current_token).hook("count")(args);
    },
    find_one: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("group", current_token).hook("find_one")(args);
    },
    find: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("group", current_token).hook("find")(args);
    },
    find_id: async (id, parameters, token) => {
      const args = {
        params: {
          id
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("group", current_token).hook("find_id")(args);
    },
    insert: async (body, parameters, token) => {
      const args = {
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("group", current_token).hook("insert")(args);
    },
    update: async (id, body, parameters, token) => {
      const args = {
        params: {
          id
        },
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("group", current_token).hook("update")(args);
    },
    delete: async (id, parameters, token) => {
      const args = {
        params: {
          id
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("group", current_token).hook("delete")(args);
    },
    insert_multiple: async (body, parameters, token) => {
      const args = {
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("group", current_token).hook("insert_multiple")(args);
    },
    update_multiple: async (ids, body, parameters, token) => {
      const args = {
        params: {
          ids
        },
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("group", current_token).hook("update_multiple")(args);
    },
    delete_multiple: async (ids, parameters, token) => {
      const args = {
        params: {
          ids
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("group", current_token).hook("delete_multiple")(args);
    }
  },
  media: {
    upload: async (file, token) => {
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await media.create(current_token).upload(file, current_token);
    },
    presigned: async (filename, size, type, token) => {
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await media.create(current_token).presigned(filename, size, type, current_token);
    },
    count: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("media", current_token).hook("count")(args);
    },
    find_one: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("media", current_token).hook("find_one")(args);
    },
    find: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("media", current_token).hook("find")(args);
    },
    find_id: async (id, parameters, token) => {
      const args = {
        params: {
          id
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("media", current_token).hook("find_id")(args);
    },
    insert: async (body, parameters, token) => {
      const args = {
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("media", current_token).hook("insert")(args);
    },
    update: async (id, body, parameters, token) => {
      const args = {
        params: {
          id
        },
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("media", current_token).hook("update")(args);
    },
    delete: async (id, parameters, token) => {
      const args = {
        params: {
          id
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("media", current_token).hook("delete")(args);
    },
    insert_multiple: async (body, parameters, token) => {
      const args = {
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("media", current_token).hook("insert_multiple")(args);
    },
    update_multiple: async (ids, body, parameters, token) => {
      const args = {
        params: {
          ids
        },
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("media", current_token).hook("update_multiple")(args);
    },
    delete_multiple: async (ids, parameters, token) => {
      const args = {
        params: {
          ids
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("media", current_token).hook("delete_multiple")(args);
    }
  },
  errors: {
    count: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("error", current_token).hook("count")(args);
    },
    find_one: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("error", current_token).hook("find_one")(args);
    },
    find: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("error", current_token).hook("find")(args);
    },
    find_id: async (id, parameters, token) => {
      const args = {
        params: {
          id
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("error", current_token).hook("find_id")(args);
    },
    insert: async (body, parameters, token) => {
      const args = {
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("error", current_token).hook("insert")(args);
    },
    update: async (id, body, parameters, token) => {
      const args = {
        params: {
          id
        },
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("error", current_token).hook("update")(args);
    },
    delete: async (id, parameters, token) => {
      const args = {
        params: {
          id
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("error", current_token).hook("delete")(args);
    },
    insert_multiple: async (body, parameters, token) => {
      const args = {
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("error", current_token).hook("insert_multiple")(args);
    },
    update_multiple: async (ids, body, parameters, token) => {
      const args = {
        params: {
          ids
        },
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("error", current_token).hook("update_multiple")(args);
    },
    delete_multiple: async (ids, parameters, token) => {
      const args = {
        params: {
          ids
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("error", current_token).hook("delete_multiple")(args);
    }
  },
  requests: {
    count: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("request", current_token).hook("count")(args);
    },
    find_one: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("request", current_token).hook("find_one")(args);
    },
    find: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("request", current_token).hook("find")(args);
    },
    find_id: async (id, parameters, token) => {
      const args = {
        params: {
          id
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("request", current_token).hook("find_id")(args);
    },
    insert: async (body, parameters, token) => {
      const args = {
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("request", current_token).hook("insert")(args);
    },
    update: async (id, body, parameters, token) => {
      const args = {
        params: {
          id
        },
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("request", current_token).hook("update")(args);
    },
    delete: async (id, parameters, token) => {
      const args = {
        params: {
          id
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("request", current_token).hook("delete")(args);
    },
    insert_multiple: async (body, parameters, token) => {
      const args = {
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("request", current_token).hook("insert_multiple")(args);
    },
    update_multiple: async (ids, body, parameters, token) => {
      const args = {
        params: {
          ids
        },
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("request", current_token).hook("update_multiple")(args);
    },
    delete_multiple: async (ids, parameters, token) => {
      const args = {
        params: {
          ids
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("request", current_token).hook("delete_multiple")(args);
    }
  },
  settings: {
    count: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("setting", current_token).hook("count")(args);
    },
    find_one: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("setting", current_token).hook("find_one")(args);
    },
    find: async (parameters, token) => {
      const args = {
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("setting", current_token).hook("find")(args);
    },
    find_id: async (id, parameters, token) => {
      const args = {
        params: {
          id
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("setting", current_token).hook("find_id")(args);
    },
    insert: async (body, parameters, token) => {
      const args = {
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("setting", current_token).hook("insert")(args);
    },
    update: async (id, body, parameters, token) => {
      const args = {
        params: {
          id
        },
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("setting", current_token).hook("update")(args);
    },
    delete: async (id, parameters, token) => {
      const args = {
        params: {
          id
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("setting", current_token).hook("delete")(args);
    },
    insert_multiple: async (body, parameters, token) => {
      const args = {
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("setting", current_token).hook("insert_multiple")(args);
    },
    update_multiple: async (ids, body, parameters, token) => {
      const args = {
        params: {
          ids
        },
        body,
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("setting", current_token).hook("update_multiple")(args);
    },
    delete_multiple: async (ids, parameters, token) => {
      const args = {
        params: {
          ids
        },
        ...parameters
      };
      let current_token;
      const hook_token2 = hooks.get_token();
      if (typeof hook_token2 === "string" && hook_token2 !== "") {
        current_token = hook_token2;
      }
      if (typeof token === "string" && token !== "") {
        current_token = token;
      }
      return await base.create("setting", current_token).hook("delete_multiple")(args);
    }
  }
};
module.exports = __toCommonJS(hooks_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hooks
});
