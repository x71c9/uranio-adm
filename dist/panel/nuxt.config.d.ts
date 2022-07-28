declare namespace _default {
    const dev: boolean;
    const buildDir: string;
    const srcDir: string;
    const target: string;
    const ssr: boolean;
    namespace generate {
        const dir: string;
        const fallback: string;
        const subFolders: boolean;
        const exclude: string[];
    }
    namespace server {
        const host: string;
        const port: number;
    }
    const proxy: {
        '/uranio/api': {
            target: string | undefined;
            secure: boolean;
            pathRewrite: {
                "^/uranio/api": string;
            };
        };
    };
    const modules: string[];
    const buildModules: string[];
    namespace typescript {
        const configFile: string;
        const typeCheck: boolean;
    }
    const plugins: {
        src: string;
    }[];
    const telemetry: boolean;
    const alias: {
        'uranio/client': string;
        'uranio-trx/client': string;
        'uranio-trx/client/types': string;
        'uranio-api/client': string;
        'uranio-api/client/types': string;
        'uranio-core/client': string;
        'uranio-core/client/types': string;
    };
    namespace env {
        const URN_LOG_LEVEL: string | urn_log.LogLevel;
    }
    const components: {
        path: string;
        extensions: string[];
    }[];
    namespace router {
        const middleware: string[];
        const linkActiveClass: string;
        const linkExactActiveClass: string;
        function parseQuery(q: any): import("qs").ParsedQs;
        function parseQuery(q: any): import("qs").ParsedQs;
        function stringifyQuery(q: any): string;
        function stringifyQuery(q: any): string;
    }
    namespace loading {
        const color: string;
        const height: string;
        const throttle: number;
        const duration: number;
        const continuous: boolean;
    }
    const watch: string[];
    namespace hooks {
        namespace build {
            function before(): void;
            function before(): void;
            function compile(): void;
            function compile(): void;
            function compiled(): void;
            function compiled(): void;
        }
    }
}
export default _default;
import { urn_log } from "urn-lib";
