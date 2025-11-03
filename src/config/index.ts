import 'dotenv/config';
import { port, host, logLevel } from '../environment';

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

const config: Config = {
  server: {
    port,
    host
  },
  logger: {
    enabled: true,
    level: logLevel
  }
};

export default config;
