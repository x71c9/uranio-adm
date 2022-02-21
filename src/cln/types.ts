/**
 * Exported type module for client
 *
 * @packageDocumentation
 */

export * from '../trx/cln/types';

// Override Book from '../trx/cln/types' by '../typ/book_cln'
import {Book} from '../typ/book_cln';

export {Book};

// Override FullClientConf and ClientConf from '../trx/typ/conf_cln' by '../typ/conf_cln'
import {FullClientConfiguration, ClientConfiguration} from '../typ/conf_cln';

export {FullClientConfiguration, ClientConfiguration};

export * from '../typ/conf_cln';
