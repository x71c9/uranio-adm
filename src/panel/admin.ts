#!/usr/bin/env node

/**
 * Admin binary entrypoint for uranio-adm Panel
 *
 * @packageDocumentation
 */

import dotenv from 'dotenv';
const result = dotenv.config();

if(result.error){
	throw result.error;
}

import {urn_log} from 'urn-lib';
urn_log.init({
	log_level: urn_log.LogLevel.FUNCTION_DEBUG,
	debug_info: false,
	color: true
});

export * from '../client/register';

import uranio from '../client';
uranio.init();
