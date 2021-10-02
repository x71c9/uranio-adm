/**
 * Client Conf type module
 *
 * @packageDocumentation
 */

import {RawName} from '../raw/types';

type RequiredClientConfigParams = {
	raw: RawName
	base_url: string
}

type OptionalClientConfigParam = {
}

export type ClientConfiguration =
	RequiredClientConfigParams &
	Partial<OptionalClientConfigParam>;

export type FullClientConfiguration =
	RequiredClientConfigParams &
	OptionalClientConfigParam;

