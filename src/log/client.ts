/**
 * Log module
 *
 * @packageDocumentation
 */

import {urn_log} from 'urn-lib';

import * as conf from '../conf/client';

import * as env from '../env/client';

export function init(urn_log_lib:typeof urn_log):void{
	urn_log_lib.init({
		log_level: env.get(`log_level`),
		debug_info: conf.get(`log_debug_info`),
		color: conf.get(`log_color`),
		time_format: conf.get(`log_time_format`),
		max_str_length: conf.get(`log_max_str_length`),
		prefix: conf.get(`log_prefix`),
		prefix_type: conf.get(`log_prefix_type`),
	});
}
