/**
 * Client Conf type module
 *
 * @packageDocumentation
 */

import {
	ClientConfiguration as TrxClientConfiguration,
} from 'uranio-trx/cln/types';

type RequiredClientConfigParams = {
}

type OptionalClientConfigParam = {
}

export type ClientConfiguration =
	TrxClientConfiguration &
	RequiredClientConfigParams &
	Partial<OptionalClientConfigParam>;
