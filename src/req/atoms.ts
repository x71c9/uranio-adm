/**
 * Required Admin atoms
 *
 * @packageDocumentation
 */

import * as types from '../cln/types';

export const required_atoms = {
	_setting:{
		plural: '_settings',
		security: {
			type: types.SecurityType.UNIFORM,
			_r: types.PermissionType.NOBODY
		},
		properties:{
			name:{
				type: types.PropertyType.TEXT,
				search: true,
				label: 'Name',
				primary: true
			},
			value:{
				type: types.PropertyType.TEXT,
				search: true,
				label: 'Value',
				optional: true,
				primary: true
			},
			filter:{
				type: types.PropertyType.ENUM_STRING,
				label: 'Filter',
				primary: true,
				values: ['A','B','C'] as string[],
				optional: true,
			}
		},
		dock:{
			url: '/_settings'
		}
	}
} as const;
