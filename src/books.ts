/**
 * Required TRX books
 *
 * @packageDocumentation
 */

import uranio from 'uranio';

export const atom = {
	setting:{
		plural: 'settings',
		security: {
			type: uranio.types.BookSecurityType.UNIFORM,
			_r: uranio.types.BookPermissionType.NOBODY
		},
		properties:{
			name:{
				type: uranio.types.BookPropertyType.TEXT,
				label: 'Name'
			}
		}
	}
} as const;

export const bll = {
	setting:{}
} as const;

export const dock = {
	setting:{
		dock: {
			url: '/settings'
		}
	}
} as const;

