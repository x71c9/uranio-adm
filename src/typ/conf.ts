/**
 * Conf type module
 *
 * @packageDocumentation
 */

import {
	Configuration as TrxConfiguration,
} from 'uranio-trx/types';

type RequiredConfigParams = {
}

type OptionalConfigParam = {
}

export type Configuration =
	TrxConfiguration &
	RequiredConfigParams &
	Partial<OptionalConfigParam>;
