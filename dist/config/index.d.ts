interface ServerConfig {
    port: number;
    host: string;
}
interface LoggerConfig {
    enabled: boolean;
    level: string;
}
interface Config {
    server: ServerConfig;
    logger: LoggerConfig;
}
declare const config: Config;
export default config;
//# sourceMappingURL=index.d.ts.map