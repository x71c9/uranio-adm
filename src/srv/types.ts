/**
 * Exported type module for server
 *
 * @packageDocumentation
 */

export * from '../trx/srv/types';

// Override Book from '../trx/cln/types' by '../typ/book_srv'
import {Book} from '../typ/book_srv';

export {Book};

// Override Book from '../trx/srv/types' by '../typ/book_cln'
import {FullConfiguration, Configuration} from '../typ/conf';

export {FullConfiguration, Configuration};

export * from '../typ/conf';
