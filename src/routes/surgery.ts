import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { DoctorType, SurgeryAssignment, QueueResponse } from '../types';
import { getSchedulerService } from '../services';

interface RequestBody {
  doctorType: DoctorType;
}

async function surgeryRoutes(fastify: FastifyInstance, options: FastifyPluginOptions): Promise<void> {
  const scheduler = getSchedulerService();

  fastify.post<{ Body: RequestBody }>('/surgery/request', async (request: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply) => {
    const { doctorType } = request.body;

    if (!doctorType || !Object.values(DoctorType).includes(doctorType)) {
      return reply.code(400).send({
        error: 'Invalid doctor type. Must be either "heart_surgeon" or "brain_surgeon"'
      });
    }

    try {
      const response = await scheduler.requestSurgery(doctorType);
    
      if ('orId' in response) {
        const assignment = response as SurgeryAssignment;
        return reply.code(200).send({
          orId: assignment.orId,
          scheduledTime: assignment.scheduledTime.toISOString()
        });
      } else {
        const queueResponse = response as QueueResponse;
        return reply.code(200).send({
          queuePosition: queueResponse.queuePosition
        });
      }
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({
        error: 'Internal server error while processing surgery request'
      });
    }
  });
}

export default surgeryRoutes;

