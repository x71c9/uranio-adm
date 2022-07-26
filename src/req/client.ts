/**
 * Required module
 *
 * @packageDocumentation
 */

import trx_client from 'uranio-trx/client';

import {required_atoms} from './atoms';

import * as conf from '../conf/client';

import * as types from '../client/types';

export function get():types.Book{
	if(conf.get('default_atoms_setting') === false){
		delete (required_atoms as any).setting;
	}
	return {
		...trx_client.required.get(),
		...required_atoms
	};
}
