/**
 * TRX run module
 *
 * @packageDocumentation
 */

import uranio from './server';
uranio.init();

const service = uranio.api.service.create();
service.listen();

// a comment
