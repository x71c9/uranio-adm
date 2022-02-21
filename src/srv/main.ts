/**
 * Main module for server
 *
 * @packageDocumentation
 */


import core from 'uranio-core';

import api from 'uranio-api';

import trx from 'uranio-trx';

import * as book from '../book/';

import * as conf from '../conf/';

import * as types from './types';

/*
 * First level methods.
 * If other methods are added, urn-cli must be updated.
 * Go to urn-cli/src/cmd/transpose.ts and
 * add the new method names.
 */
export * from '../init/';

export {
	trx,
	api,
	core,
	book,
	conf,
	types,
};
