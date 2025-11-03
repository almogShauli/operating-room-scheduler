"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const services_1 = require("../services");
async function surgeryRoutes(fastify, options) {
    const scheduler = (0, services_1.getSchedulerService)();
    fastify.post('/surgery/request', async (request, reply) => {
        const { doctorType } = request.body;
        if (!doctorType || !Object.values(types_1.DoctorType).includes(doctorType)) {
            return reply.code(400).send({
                error: 'Invalid doctor type. Must be either "heart_surgeon" or "brain_surgeon"'
            });
        }
        try {
            const response = await scheduler.requestSurgery(doctorType);
            if ('orId' in response) {
                const assignment = response;
                return reply.code(200).send({
                    orId: assignment.orId,
                    scheduledTime: assignment.scheduledTime.toISOString()
                });
            }
            else {
                const queueResponse = response;
                return reply.code(200).send({
                    queuePosition: queueResponse.queuePosition
                });
            }
        }
        catch (error) {
            fastify.log.error(error);
            return reply.code(500).send({
                error: 'Internal server error while processing surgery request'
            });
        }
    });
}
exports.default = surgeryRoutes;
//# sourceMappingURL=surgery.js.map