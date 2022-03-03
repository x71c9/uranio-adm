/**
 * Required module
 *
 * @packageDocumentation
 */

import trx from 'uranio-trx';

import {required_atoms} from './atoms';

import * as types from '../server/types';

export function get():types.Book{
	return {
		...trx.required.get(),
		...required_atoms
	};
}
