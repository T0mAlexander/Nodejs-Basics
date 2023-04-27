import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function CreateAuthUser(app: FastifyInstance) {
  await request(app.server)
    .post('/users')
    .send({
      name: 'User',
      email: 'user@email.com',
      password: '123456'
    })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: 'user@email.com',
      password: '123456'
    })

  const { token } = authResponse.body

  return { token }
}