/**
 * Log module
 *
 * @packageDocumentation
 */

import {urn_log} from 'urn-lib';

// import trx_client from 'uranio-trx/client';

import * as conf from '../conf/client';

import * as env from '../env/client';

export function init(urn_log_lib:typeof urn_log):void{
	// return trx_client.log.init(urn_log_lib);
	urn_log_lib.init({
		log_level: env.get_current(`log_level`),
		debug_info: conf.get_current(`log_debug_info`),
		color: conf.get_current(`log_color`),
		time_format: conf.get_current(`log_time_format`),
		max_str_length: conf.get_current(`log_max_str_length`),
		prefix: conf.get_current(`log_prefix`),
		prefix_type: conf.get_current(`log_prefix_type`),
	});
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

