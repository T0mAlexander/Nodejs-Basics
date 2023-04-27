import { Prisma } from '@lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function CreateAuthUser(app: FastifyInstance, Admin = false) {
  await Prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@email.com',
      password_hash: await hash('123456', 6),
      role: Admin ? 'ADMIN' : 'MEMBER'
    }
  })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: 'test@email.com',
      password: '123456'
    })

  const { token } = authResponse.body

  return { token }
}