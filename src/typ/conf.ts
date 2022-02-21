/**
 * Conf type module
 *
 * @packageDocumentation
 */

import {
	Configuration as TrxConfiguration,
	FullConfiguration as TrxFullConfiguration
} from 'uranio-trx/types';

type RequiredConfigParams = {
}

type OptionalConfigParam = {
}

export type Configuration =
	TrxConfiguration &
	RequiredConfigParams &
	Partial<OptionalConfigParam>;

export type FullConfiguration =
	TrxFullConfiguration &
	RequiredConfigParams &
	OptionalConfigParam;

