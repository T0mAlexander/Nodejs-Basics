import { FastifyInstance } from 'fastify'
import { JWTVerification } from '@http/middlewares/jwt-verification'
import { SearchName } from './search'
import { SearchNearby } from './nearby'
import { Create } from './create'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', JWTVerification)

  app.post('/gyms', Create)
  app.get('/gyms/search', SearchName)
  app.get('/gyms/nearby', SearchNearby)
}