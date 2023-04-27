import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'
import { CreateGym } from '@services/factories/create-gym'

export async function Create(request: FastifyRequest, reply: FastifyReply) {
  const CreateGymSchema = zod.object({
    name: zod.string(),
    phone: zod.string().nullable(),
    description: zod.string().nullable(),

    latitude: zod.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: zod.number().refine((value) => {
      return Math.abs(value) <= 180
    })
  })

  const { name, description, phone, latitude, longitude } = CreateGymSchema.parse(request.body)

  const CreateGymCase = CreateGym()

  await CreateGymCase.execute({
    name, description, phone, latitude, longitude
  })

  return reply.status(201).send()
}