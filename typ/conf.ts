/**
 * Conf type module
 *
 * @packageDocumentation
 */

import {FullConfiguration as ApiFullConfiguration} from 'uranio-trx/types';

type RequiredConfigParams = {
}

type OptionalConfigParam = {
}

export type Configuration =
	ApiFullConfiguration &
	RequiredConfigParams &
	Partial<OptionalConfigParam>;

export type FullConfiguration =
	ApiFullConfiguration &
	RequiredConfigParams &
	OptionalConfigParam;

