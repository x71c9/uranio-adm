/**
 * Main module for server
 *
 * @packageDocumentation
 */
import trx from 'uranio-trx';
import { schema } from '../sch/index';
import * as book from '../book/index';
import * as conf from '../conf/index';
import * as types from './types';
export * from '../init/index';
export { trx, schema, book, conf, types, };
