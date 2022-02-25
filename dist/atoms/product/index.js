"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
exports.default = server_1.default.register({
    plural: 'products',
    security: {
        type: server_1.default.types.SecurityType.UNIFORM,
        _r: server_1.default.types.PermissionType.NOBODY
    },
    properties: {
        title: {
            type: server_1.default.types.PropertyType.EMAIL,
            label: 'Title'
        },
        price: {
            type: server_1.default.types.PropertyType.FLOAT,
            label: 'Price'
        }
    },
    dock: {
        url: '/products',
        routes: {
            add_review: {
                url: '/add-review',
                action: server_1.default.types.AuthAction.WRITE,
                method: server_1.default.types.RouteMethod.GET,
                query: ['stars'],
                return: 'boolean',
                call: (_api_requst) => {
                    return true;
                }
            }
        }
    }
});
//# sourceMappingURL=index.js.map