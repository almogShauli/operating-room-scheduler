import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import surgeryRoutes from './surgery';

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions): Promise<void> {
  await fastify.register(surgeryRoutes);
}

export default routes;
