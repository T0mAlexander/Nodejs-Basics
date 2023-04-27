import { FastifyInstance } from 'fastify'
import { JWTVerification } from '@http/middlewares/jwt-verification'
import { SearchName } from './search'
import { SearchNearby } from './nearby'
import { Create } from './create'
import { RoleVerification } from '@http/middlewares/role-verification'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', JWTVerification)

  app.get('/gyms/search', SearchName)
  app.get('/gyms/nearby', SearchNearby)
  app.post('/gyms', { onRequest: [RoleVerification('ADMIN')] }, Create)
}