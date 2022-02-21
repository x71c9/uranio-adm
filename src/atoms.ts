/**
 * Required Admin atoms
 *
 * @packageDocumentation
 */

import * as types from './types';

export const atom_book = {
	setting:{
		plural: 'settings',
		security: {
			type: types.SecurityType.UNIFORM,
			_r: types.PermissionType.NOBODY
		},
		properties:{
			name:{
				type: types.PropertyType.TEXT,
				label: 'Name'
			}
		}
	}
} as const;
