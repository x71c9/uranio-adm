/**
 * Client Conf type module
 *
 * @packageDocumentation
 */

import {
	ClientConfiguration as TrxClientConfiguration,
} from 'uranio-trx/client/types';

type RequiredClientConfigParams = {
}

type OptionalClientConfigParam = {
}

export type ClientConfiguration =
	TrxClientConfiguration &
	RequiredClientConfigParams &
	Partial<OptionalClientConfigParam>;
