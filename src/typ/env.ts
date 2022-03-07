/**
 * Env type module
 *
 * @packageDocumentation
 */

import trx from 'uranio-trx';

type RequiredEnvParams = {
}

type OptionalEnvParam = {
}

export type Environment =
	trx.types.Environment &
	RequiredEnvParams &
	Partial<OptionalEnvParam>;
