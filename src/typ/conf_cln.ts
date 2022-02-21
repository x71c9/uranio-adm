/**
 * Client Conf type module
 *
 * @packageDocumentation
 */

import {
	ClientConfiguration as TrxClientConfiguration,
	FullClientConfiguration as TrxFullClientConfiguration
} from 'uranio-trx/cln/types';

type RequiredClientConfigParams = {
}

type OptionalClientConfigParam = {
}

export type ClientConfiguration =
	TrxClientConfiguration &
	RequiredClientConfigParams &
	Partial<OptionalClientConfigParam>;

export type FullClientConfiguration =
	TrxFullClientConfiguration &
	RequiredClientConfigParams &
	OptionalClientConfigParam;
