/**
 * Module for default configuration object
 *
 * @packageDocumentation
 */

import {Configuration} from '../server/types';

import trx from 'uranio-trx';

export const adm_config:Required<Configuration> = {
	
	...trx.conf.get_all(),
	
	default_atoms_setting: true
	
};
