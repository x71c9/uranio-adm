/**
 * Required module
 *
 * @packageDocumentation
 */

import trx from 'uranio-trx';

import {required_atoms} from './atoms';

import * as conf from '../conf/server';

import * as types from '../srv/types';

export function get():types.Book{
	if(conf.get('default_atoms_setting') === false){
		delete (required_atoms as any)._setting;
	}
	return {
		...trx.required.get(),
		...required_atoms
	};
}
