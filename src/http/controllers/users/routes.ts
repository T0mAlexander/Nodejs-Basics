import { FastifyInstance } from 'fastify'
import { Register } from '@http/controllers/users/register'
import { Authenticate } from '@http/controllers/users/auth'
import { Profile } from '@http/controllers/users/profile'
import { JWTVerification } from '@http/middlewares/jwt-verification'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', Register)
  app.post('/sessions', Authenticate)
  app.get('/me', {onRequest: [JWTVerification]}, Profile)
}