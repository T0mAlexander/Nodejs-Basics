import { GetUserProfile } from '@services/factories/user-profile'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function Profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = GetUserProfile()

  const { User } = await getUserProfile.execute({
    id: request.user.sub
  })

  return reply.status(200).send({
    User: {
      ...User,
      password_hash: undefined
    }
  })
}