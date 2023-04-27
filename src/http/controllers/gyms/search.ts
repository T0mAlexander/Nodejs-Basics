import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'
import { SearchGymsByName } from '@services/factories/search-gyms'

export async function SearchName(request: FastifyRequest, reply: FastifyReply) {
  const SearchGymNameSchema = zod.object({
    q: zod.string(),
    page: zod.coerce.number().min(1).default(1)
  })

  const { q, page } = SearchGymNameSchema.parse(request.query)

  const SearchGymCase = SearchGymsByName()

  const { gyms } = await SearchGymCase.execute({
    query: q, page
  })

  return reply.status(200).send({ gyms })
}