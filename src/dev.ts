/**
 * TRX run module
 *
 * @packageDocumentation
 */

import {urn_log} from 'urn-lib';
urn_log.init({
	log_level: urn_log.LogLevel.FUNCTION_DEBUG
});

export * from './server/hooks';

import uranio from './server';
uranio.init();

const service = uranio.api.service.create();
service.listen(async () => {
	urn_log.debug(`Listening on port ${uranio.conf.get(`service_port`)}...`);
	// const auth_resp = await uranio.trx.hooks.superusers.authenticate(
	//   'uranio@uranio.xyz',
	//   'kcXkaF3Ad7KC3G3t'
	// );
	// if(auth_resp.success){
	//   uranio.trx.hooks.errors.count({}, auth_resp.payload.token);
	// }
});