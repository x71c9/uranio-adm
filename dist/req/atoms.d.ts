/**
 * Required Admin atoms
 *
 * @packageDocumentation
 */
import * as types from '../cln/types';
export declare const required_atoms: {
    readonly _setting: {
        readonly plural: "_settings";
        readonly security: {
            readonly type: types.SecurityType.UNIFORM;
            readonly _r: types.PermissionType.NOBODY;
        };
        readonly properties: {
            readonly name: {
                readonly type: types.PropertyType.TEXT;
                readonly search: true;
                readonly label: "Name";
                readonly primary: true;
            };
            readonly value: {
                readonly type: types.PropertyType.TEXT;
                readonly search: true;
                readonly label: "Value";
                readonly optional: true;
                readonly primary: true;
            };
            readonly filter: {
                readonly type: types.PropertyType.ENUM_STRING;
                readonly label: "Filter";
                readonly primary: true;
                readonly values: string[];
                readonly optional: true;
            };
        };
        readonly dock: {
            readonly url: "/_settings";
        };
    };
};
