import { FastifyReply, FastifyRequest } from 'fastify'
import zod from 'zod'
import { UserAlreadyExistsError } from '@services/errors/register'
import { MakeRegisterCase } from '@services/factories/register'

export async function Register(request: FastifyRequest, reply: FastifyReply) {
  const RegisterBodySchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6)
  })

  const { name, email, password } = RegisterBodySchema.parse(request.body)

  try {
    const RegisterCase = MakeRegisterCase()

    await RegisterCase.execute({
      name, email, password
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message
      })
    }

    throw error
  }

  return reply.status(201).send()
}