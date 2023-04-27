import fastify from 'fastify'
import { ZodError } from 'zod'
import { Env } from 'env'
import fastifyCookie from '@fastify/cookie'
import { fastifyJwt as JWT } from '@fastify/jwt'
import { usersRoutes } from '@http/controllers/users/routes'
import { gymsRoutes } from '@http/controllers/gyms/routes'
import { checkInsRoutes } from '@http/controllers/check-ins/routes'

export const app = fastify()

app.register(JWT, {
  secret: Env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false
  },
  sign: {
    expiresIn: '10m'
  }
})

app.register(fastifyCookie)
app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error!',
      issues: error.format()
    })
  }

  if (Env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    //TODO Suggestion: Observability tools (e.g Datadog, New Relic or Jaeger) would be a good fit for application monitoring
  }

  return reply.status(500).send({
    message: 'Internal server error'
  })
}) 