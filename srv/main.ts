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

export {
	trx,
	api,
	core,
	book,
	conf,
	types,
};
