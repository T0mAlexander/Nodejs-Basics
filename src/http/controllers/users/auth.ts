import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialsError } from '@services/errors/credentials'
import zod from 'zod'
import { MakeAuthCase } from '@services/factories/auth'

export async function Authenticate(request: FastifyRequest, reply: FastifyReply) {
  const AuthBodySchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
  })

  const { email, password } = AuthBodySchema.parse(request.body)

  try {
    const AuthCase = MakeAuthCase()

    const { User } = await AuthCase.execute({
      email, password
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: User.id
        }
      }
    )

    return reply.status(200).send({ token })

  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message
      })
    }

    throw error
  }
}