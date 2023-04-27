import { FastifyReply, FastifyRequest } from 'fastify'

export function RoleVerification(predefinedRole: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (role !== predefinedRole) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}