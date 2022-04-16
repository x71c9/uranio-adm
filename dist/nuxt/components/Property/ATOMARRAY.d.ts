import uranio from 'uranio/client';
declare type Data = {
    prop_atom_name: uranio.schema.AtomName;
    prop_primary_properties: string[];
    rerender_key: number;
};
declare type Methods = {
    remove: (atom_id: string) => void;
    add: () => void;
};
declare type Computed = Record<string, never>;
declare type Props = Record<string, never>;
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
            _r?: string | undefined;
            _w?: string | undefined;
            _from?: string | undefined;
            name: string;
        } & Record<never, unknown>)[] | undefined;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        _r?: string | undefined;
        _w?: string | undefined;
        _from?: string | undefined;
    } & {
        groups?: (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
            _r?: string | undefined;
            _w?: string | undefined;
            _from?: string | undefined;
            name: string;
        } & Record<never, unknown>)[] | undefined;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        _r?: string | undefined;
        _w?: string | undefined;
        _from?: string | undefined;
    } & {
        request?: (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
            _r?: string | undefined;
            _w?: string | undefined;
            _from?: string | undefined;
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
        } & Record<never, unknown>) | undefined;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        _r?: string | undefined;
        _w?: string | undefined;
        _from?: string | undefined;
    } & {
        groups?: (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
            _r?: string | undefined;
            _w?: string | undefined;
            _from?: string | undefined;
            name: string;
        } & Record<never, unknown>)[] | undefined;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        _r?: string | undefined;
        _w?: string | undefined;
        _from?: string | undefined;
    } & {
        groups?: (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
            _r?: string | undefined;
            _w?: string | undefined;
            _from?: string | undefined;
            name: string;
        } & Record<never, unknown>)[] | undefined;
    }) | (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
        _r?: string | undefined;
        _w?: string | undefined;
        _from?: string | undefined;
    } & {
        request?: (import("uranio-schema/dist/typ/common").AtomHardProperties & import("uranio-schema/dist/typ/common").AtomCommonProperties & {
            _r?: string | undefined;
            _w?: string | undefined;
            _from?: string | undefined;
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
        } & Record<never, unknown>) | undefined;
    });
    atom_name: uranio.core.schema.AtomName;
    prop_name: "_id" | "_date" | "_r" | "_w" | "_from";
    prop_type: string;
    focus: boolean;
} & import("vue").default & {
    dragging: boolean;
    drag_group: string;
} & {
    drag_start: () => void;
    drag_end: () => void;
} & {
    drag_options: {
        animation: 200;
        group: string;
        disabled: boolean;
        ghostClass: string;
        dragClass: string;
    };
}, Data, Methods, Computed, Props>;
export default _default;
