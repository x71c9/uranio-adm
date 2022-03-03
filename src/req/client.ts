/**
 * Required module
 *
 * @packageDocumentation
 */

import trx_client from 'uranio-trx/client';

import {required_atoms} from './atoms';

import * as types from '../client/types';

export function get():types.Book{
	return {
		...trx_client.required.get(),
		...required_atoms
	};
}
