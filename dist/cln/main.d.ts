/**
 * Main module for client
 *
 * @packageDocumentation
 */
import trx from 'uranio-trx/client';
import { schema } from '../sch/index';
import * as book from '../book/client';
import * as conf from '../conf/client';
import * as types from './types';
export * from '../init/client';
export { schema, trx, book, conf, types };
