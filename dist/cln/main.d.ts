/**
 * Main module for client
 *
 * @packageDocumentation
 */
import core from 'uranio-core/client';
import api from 'uranio-api/client';
import trx from 'uranio-trx/client';
import { schema } from '../sch/index';
import * as book from '../book/client';
import * as conf from '../conf/client';
import * as log from '../log/client';
import * as types from './types';
export * from '../init/client';
export * from '../reg/client';
export { core, api, trx, log, schema, book, conf, types };
