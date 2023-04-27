import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'
import { GetUserCheckInsHistory } from '@services/factories/user-history'

export async function History(request: FastifyRequest, reply: FastifyReply) {
  const CheckInHistorySchema = zod.object({
    page: zod.coerce.number().min(1).default(1)
  })

  const { page } = CheckInHistorySchema.parse(request.query)

  const UserCheckInsHistory = GetUserCheckInsHistory()

  const { checkInHistory } = await UserCheckInsHistory.execute({
    userId: request.user.sub,
    page
  })

  return reply.status(200).send({ checkInHistory })
} 