/**
 * Main module for server
 *
 * @packageDocumentation
 */
import core from 'uranio-core';
import api from 'uranio-api';
import trx from 'uranio-trx';
import { schema } from '../sch/index';
import * as book from '../book/index';
import * as conf from '../conf/index';
import * as log from '../log/index';
import * as types from './types';
export * from '../init/index';
export { core, api, trx, schema, log, book, conf, types, };
