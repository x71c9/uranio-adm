/**
 * Required Admin atoms
 *
 * @packageDocumentation
 */
import * as types from '../client/types';
export declare const required_atoms: {
    readonly setting: {
        readonly plural: "settings";
        readonly security: {
            readonly type: types.SecurityType.UNIFORM;
            readonly _r: types.PermissionType.NOBODY;
        };
        readonly properties: {
            readonly name: {
                readonly type: types.PropertyType.TEXT;
                readonly label: "Name";
            };
        };
        readonly dock: {
            readonly url: "/settings";
        };
    };
};
