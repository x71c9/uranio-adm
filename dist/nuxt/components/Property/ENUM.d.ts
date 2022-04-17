import uranio from 'uranio/client';
declare type EnumNS = uranio.types.PropertyType.ENUM_NUMBER | uranio.types.PropertyType.ENUM_STRING;
declare type EnumNSValues<T extends EnumNS> = T extends uranio.types.PropertyType.ENUM_NUMBER ? number[] : string[];
declare type Data<T extends EnumNS> = {
    enum_values: EnumNSValues<T>;
    enum_type: T;
    prop_label: string;
};
declare type Methods = {
    on_change: (event: Event) => void;
};
declare type Computed = {};
declare type Props = {};
declare const _default: import("vue/types/vue").ExtendedVue<{
    [x: string]: never;
} & {
    [x: string]: never;
} & {
    [x: string]: never;
} & {
    molecule: (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        email: string;
        password: string;
        groups?: string[] | undefined;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        email: string;
        password: string;
        groups?: string[] | undefined;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        name: string;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        src: string;
        filename: string;
        type: string;
        size: number;
        width?: number | undefined;
        height?: number | undefined;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        status: number;
        msg: string;
        error_code: string;
        error_msg: string;
        request?: string | undefined;
        stack?: string | undefined;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        full_path: string;
        route_path?: string | undefined;
        atom_path?: string | undefined;
        connection_path?: string | undefined;
        method?: string | undefined;
        atom_name?: string | undefined;
        route_name?: string | undefined;
        params?: string | undefined;
        query?: string | undefined;
        headers?: string | undefined;
        body?: string | undefined;
        file?: string | undefined;
        ip?: string | undefined;
        is_auth?: boolean | undefined;
        auth_action?: string | undefined;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        name: string;
        value: string;
        filter: string;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        _r?: string | undefined;
        _w?: string | undefined;
        _from?: string | undefined;
    } & {
        groups?: (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
            name: string;
        })[] | undefined;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        _r?: string | undefined;
        _w?: string | undefined;
        _from?: string | undefined;
    } & {
        groups?: (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
            name: string;
        })[] | undefined;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        _r?: string | undefined;
        _w?: string | undefined;
        _from?: string | undefined;
    } & Record<never, unknown>) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        _r?: string | undefined;
        _w?: string | undefined;
        _from?: string | undefined;
    } & {
        request?: (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
            full_path: string;
            route_path?: string | undefined;
            atom_path?: string | undefined;
            connection_path?: string | undefined;
            method?: string | undefined;
            atom_name?: string | undefined;
            route_name?: string | undefined;
            params?: string | undefined;
            query?: string | undefined;
            headers?: string | undefined;
            body?: string | undefined;
            file?: string | undefined;
            ip?: string | undefined;
            is_auth?: boolean | undefined;
            auth_action?: string | undefined;
        }) | undefined;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        _r?: string | undefined;
        _w?: string | undefined;
        _from?: string | undefined;
    } & {
        groups?: (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
            name: string;
            _r?: string | undefined;
            _w?: string | undefined;
            _from?: string | undefined;
        } & Record<never, unknown>)[] | undefined;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        _r?: string | undefined;
        _w?: string | undefined;
        _from?: string | undefined;
    } & {
        groups?: (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
            name: string;
            _r?: string | undefined;
            _w?: string | undefined;
            _from?: string | undefined;
        } & Record<never, unknown>)[] | undefined;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        _r?: string | undefined;
        _w?: string | undefined;
        _from?: string | undefined;
    } & {
        request?: (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
            atom_name?: string | undefined;
            _r?: string | undefined;
            _w?: string | undefined;
            _from?: string | undefined;
            full_path: string;
            route_path?: string | undefined;
            atom_path?: string | undefined;
            connection_path?: string | undefined;
            method?: string | undefined;
            route_name?: string | undefined;
            params?: string | undefined;
            query?: string | undefined;
            headers?: string | undefined;
            body?: string | undefined;
            file?: string | undefined;
            ip?: string | undefined;
            is_auth?: boolean | undefined;
            auth_action?: string | undefined;
        } & Record<never, unknown>) | undefined;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        _r?: string | undefined;
        _w?: string | undefined;
        _from?: string | undefined;
    } & {
        groups?: (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
            name: string;
            _r?: string | undefined;
            _w?: string | undefined;
            _from?: string | undefined;
        } & Record<never, unknown>)[] | undefined;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        _r?: string | undefined;
        _w?: string | undefined;
        _from?: string | undefined;
    } & {
        groups?: (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
            name: string;
            _r?: string | undefined;
            _w?: string | undefined;
            _from?: string | undefined;
        } & Record<never, unknown>)[] | undefined;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        _r?: string | undefined;
        _w?: string | undefined;
        _from?: string | undefined;
    } & {
        request?: (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
            atom_name?: string | undefined;
            _r?: string | undefined;
            _w?: string | undefined;
            _from?: string | undefined;
            full_path: string;
            route_path?: string | undefined;
            atom_path?: string | undefined;
            connection_path?: string | undefined;
            method?: string | undefined;
            route_name?: string | undefined;
            params?: string | undefined;
            query?: string | undefined;
            headers?: string | undefined;
            body?: string | undefined;
            file?: string | undefined;
            ip?: string | undefined;
            is_auth?: boolean | undefined;
            auth_action?: string | undefined;
        } & Record<never, unknown>) | undefined;
    });
    atom_name: uranio.core.schema.AtomName;
    prop_name: "_id" | "_date" | "_r" | "_w" | "_from";
    prop_type: string;
    focus: boolean;
} & import("vue").default, Data<EnumNS>, Methods, Computed, Props>;
export default _default;
