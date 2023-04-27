import { GetCheckIn } from '@services/factories/check-in'
import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'

export async function Create(request: FastifyRequest, reply: FastifyReply) {
  const CheckInParameterSchema = zod.object({
    gymId: zod.string().uuid()
  })

  const CreateCheckInSchema = zod.object({
    latitude: zod.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: zod.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const { gymId } = CheckInParameterSchema.parse(request.params)
  const { latitude, longitude } = CreateCheckInSchema.parse(request.body)

  const CreateGymCase = GetCheckIn()

  await CreateGymCase.execute({
    gymId,
    userId: request.user.sub,
    userCurrentLatitude: latitude,
    userCurrentLongitude: longitude
  })

  return reply.status(201).send()
}