require('dotenv').config();
import { buildApp } from './app';
import config from './config';

const start = async (): Promise<void> => {
  try {
    const app = await buildApp();
    
    await app.listen({
      port: config.server.port,
      host: config.server.host
    });

    app.log.info(`Server is running on http://${config.server.host}:${config.server.port}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
