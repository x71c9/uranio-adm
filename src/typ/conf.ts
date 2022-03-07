/**
 * Conf type module
 *
 * @packageDocumentation
 */

import trx from 'uranio-trx';

type RequiredConfigParams = {
}

type OptionalConfigParam = {
}

export type Configuration =
	trx.types.Configuration &
	RequiredConfigParams &
	Partial<OptionalConfigParam>;
