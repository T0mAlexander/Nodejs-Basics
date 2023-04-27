import { FastifyInstance } from 'fastify'
import { JWTVerification } from '@http/middlewares/jwt-verification'
import { Create } from './create'
import { Validation } from './validation'
import { History } from './history'
import { Metrics } from './metrics'
import { RoleVerification } from '@http/middlewares/role-verification'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', JWTVerification)

  app.post('/gyms/:gymId/check-ins', Create)
  app.patch('/check-ins/:checkInID/validate', { onRequest: [RoleVerification('ADMIN')] }, Validation)
  app.get('/check-ins/history', History)
  app.get('/check-ins/metrics', Metrics)
}