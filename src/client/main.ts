/**
 * Main module for client
 *
 * @packageDocumentation
 */

import core from 'uranio-core/client';

import api from 'uranio-api/client';

import trx from 'uranio-trx/client';

import {schema} from '../sch/client';

import * as book from '../book/client';

import * as conf from '../conf/client';

import * as env from '../env/client';

import * as log from '../log/client';

import * as register from '../reg/client';

import * as required from '../req/client';

import * as types from './types';

export * from '../init/client';

export {
	core,
	api,
	trx,
	log,
	schema,
	book,
	conf,
	env,
	register,
	required,
	types
};
