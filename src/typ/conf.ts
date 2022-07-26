/**
 * Conf type module
 *
 * @packageDocumentation
 */

import trx from 'uranio-trx';

type RequiredConfigParams = {
}

type OptionalConfigParam = {
	default_atoms_setting: boolean
}

export type Configuration =
	trx.types.Configuration &
	RequiredConfigParams &
	Partial<OptionalConfigParam>;
