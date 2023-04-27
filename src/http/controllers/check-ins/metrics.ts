import { FastifyReply, FastifyRequest } from 'fastify'
import { GetUserMetrics } from '@services/factories/user-metrics'

export async function Metrics(request: FastifyRequest, reply: FastifyReply) {
  const UserMetricsSchema = GetUserMetrics()

  const { checkInCount } = await UserMetricsSchema.execute({
    userId: request.user.sub
  })

  return reply.status(200).send({ checkInCount })
} 