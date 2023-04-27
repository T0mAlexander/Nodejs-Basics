import { FastifyInstance } from 'fastify'
import { Register } from './controllers/users/register'
import { Authenticate } from './controllers/users/auth'
import { Profile } from './controllers/users/profile'
import { JWTVerification } from './middlewares/jwt-verification'

export async function Routes(app: FastifyInstance) {
  app.post('/users', Register)
  app.post('/sessions', Authenticate)
  app.get('/me', {onRequest: [JWTVerification]}, Profile)
}