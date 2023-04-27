import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'
import { SearchNearbyGyms } from '@services/factories/search-nearby-gyms'

export async function SearchNearby(request: FastifyRequest, reply: FastifyReply) {
  const SearchNearbyGymSchema = zod.object({
    latitude: zod.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: zod.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    })
  })

  const { latitude, longitude } = SearchNearbyGymSchema.parse(request.query)

  const SearchGymCase = SearchNearbyGyms()

  const { gyms } = await SearchGymCase.execute({
    userCurrentLatitude: latitude,
    userCurrentLongitude: longitude
  })

  return reply.status(200).send({ gyms })
}