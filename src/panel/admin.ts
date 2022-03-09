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

export * from '../client/register';

import uranio from '../client';
uranio.init();
