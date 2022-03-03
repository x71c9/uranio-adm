/**
 * Main module for server
 *
 * @packageDocumentation
 */
import core from 'uranio-core';
import api from 'uranio-api';
import trx from 'uranio-trx';
import { schema } from '../sch/server';
import * as book from '../book/server';
import * as conf from '../conf/server';
import * as log from '../log/server';
import * as util from '../util/server';
import * as register from '../reg/server';
import * as required from '../req/server';
import * as types from './types';
export * from '../init/server';
export { core, api, trx, schema, log, book, conf, util, register, required, types, };
