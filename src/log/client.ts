/**
 * Log module
 *
 * @packageDocumentation
 */

import {urn_log} from 'urn-lib';

import trx_client from 'uranio-trx/client';

export function init(urn_log_lib:typeof urn_log):void{
	return trx_client.log.init(urn_log_lib);
}

// export function init(log_config?: urn_log.LogLevel):void
// export function init(log_config?: urn_log.LogConfig):void
// export function init(log_config?: urn_log.LogConfig | urn_log.LogLevel):void{
//   /**
//    * This "if else" is needed otherwise Typescript will complain
//    * the overloads don't match.
//    */
//   if(typeof log_config === 'number'){
//     trx_client.log.init(log_config);
//     urn_log.init(log_config);
//   }else{
//     trx_client.log.init(log_config);
//     urn_log.init(log_config);
//   }
// }

