"use strict";
/**
 * TRX run module
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const urn_lib_1 = require("urn-lib");
urn_lib_1.urn_log.init({
    log_level: urn_lib_1.urn_log.LogLevel.FUNCTION_DEBUG
});
__exportStar(require("./hooks"), exports);
const server_1 = __importDefault(require("./server"));
server_1.default.init();
const service = server_1.default.api.service.create();
service.listen(async () => {
    urn_lib_1.urn_log.debug(`Listening on port ${server_1.default.conf.get(`service_port`)}...`);
    // const auth_resp = await uranio.trx.hooks.superusers.authenticate(
    //   'uranio@uranio.xyz',
    //   'kcXkaF3Ad7KC3G3t'
    // );
    // if(auth_resp.success){
    //   uranio.trx.hooks.settings.count({}, auth_resp.payload.token);
    // }
    // const pro_bll = uranio.core.bll.basic.create('product');
    // pro_bll.count({}).then(c => console.log(c));
    // setTimeout(async () => {
    //   // const karts = uranio.base.create('kart');
    //   // const mycustom = karts.hook('mycustom');
    //   // const args:uranio.types.HookArguments<'kart', 'mycustom'> = {
    //   //   params: {
    //   //     id: '611bedc525e7b32c3f6415d8',
    //   //     date: 'kajflkdsa'
    //   //   },
    //   //   query: {
    //   //     sick: {
    //   //       email: '',
    //   //       email2: 'SS'
    //   //     }
    //   //   }
    //   // };
    //   // mycustom(args).then(r => console.log(r)).catch(e => console.error(e));
    //   // const a = await uranio.hooks.karts.mycustom('611bedc525e7b32c3f6415d8', 'djkhd');
    //   // console.log(a);
    //   uranio.hooks.products.delete('6128faa891988267692430a7').then(e => console.log(e)).catch(e => console.error(e));
    // }, 3000);
});
// console.log(urn_api.lib.log.defaults);
// const express_service = urn_api.service.create();
// express_service.listen(3000, () => {
//   urn_log.debug(`Listening on port 3000...`);
// });
// import * as types from './types';
// const event = {
//   rawURL: '',
//   rawQuery: '',
//   path: '/uranio/api/requests',
//   httpMethod: types.RouteMethod.GET,
//   headers: {},
//   multiValueHeaders: {},
//   queryStringParameters: null,
//   multiValueQueryStringParametes: null,
//   body: null,
//   isBase64Encoded: false
// };
// const context = {
//   callbackWaitsForEmptyEventLoop: false,
//   functionName: '',
//   functionVersion: '',
//   invokedFunctionArn: '',
//   memoryLimitInMB: '',
//   awsRequestId: '',
//   logGroupName: '',
//   logStreamName: '',
//   getRemainingTimeInMillis: () => 3
// };
// const urn_lambda = urn_api.lambda.create();
// urn_lambda.handle(event, context).then((_r) => {
//   console.log(_r);
// });
//# sourceMappingURL=dev.js.map