import { CheckInValidation } from '@services/factories/validation'
import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'

export async function Validation(request: FastifyRequest, reply: FastifyReply) {
  const CheckInValidationSchema = zod.object({
    checkInID: zod.string().uuid()
  })

  const { checkInID } = CheckInValidationSchema.parse(request.params)

  const CheckInValidationCase = CheckInValidation()

  await CheckInValidationCase.execute({
    checkInID
  })

  return reply.status(204).send()
}