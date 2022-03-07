/**
 * Client Conf type module
 *
 * @packageDocumentation
 */

import trx_client from 'uranio-trx/client';

type RequiredClientConfigParams = {
}

type OptionalClientConfigParam = {
}

export type ClientConfiguration =
	trx_client.types.ClientConfiguration &
	RequiredClientConfigParams &
	Partial<OptionalClientConfigParam>;
