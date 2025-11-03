import Fastify, { FastifyInstance } from 'fastify';
import config from './config';
import routes from './routes';
import { getQueueProcessor } from './services';

const buildApp = async (): Promise<FastifyInstance> => {
  const fastify = Fastify({
    logger: {
      level: config.logger.level
    }
  });

  await fastify.register(routes, { prefix: '/api' });

  fastify.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  const queueProcessor = getQueueProcessor();
  queueProcessor.start();

  fastify.addHook('onClose', async () => {
    queueProcessor.stop();
  });

  return fastify;
};

export { buildApp };
