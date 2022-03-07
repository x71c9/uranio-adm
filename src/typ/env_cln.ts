/**
 * Client Conf type module
 *
 * @packageDocumentation
 */

import trx_client from 'uranio-trx/client';

type RequiredClientEnvParams = {
}

type OptionalClientEnvParam = {
}

export type ClientEnvironment =
	trx_client.types.ClientEnvironment &
	RequiredClientEnvParams &
	Partial<OptionalClientEnvParam>;
