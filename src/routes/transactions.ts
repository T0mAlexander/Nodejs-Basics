import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z as Zod } from 'zod'
import { randomUUID } from 'crypto'
import { SessionCookiesCheckUp } from '../middleware/session-cookies-check'

export async function TransactionsRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: [SessionCookiesCheckUp] }, async (request) => {
    const { sessionId } = request.cookies

    const transactions = await knex('transactions')
      .where('session_id', sessionId)
      .select()

    return { transactions }
  })

  app.get('/:id', { preHandler: [SessionCookiesCheckUp] }, async (request) => {
    const ParamsType = Zod.object({
      id: Zod.string().uuid()
    })

    const { id } = ParamsType.parse(request.params)

    const { sessionId } = request.cookies

    const transaction = await knex('transactions')
      .where({
        id,
        session_id: sessionId,
      })
      .first()

    return { transaction }
  })

  app.get('/summary', { preHandler: [SessionCookiesCheckUp] }, async (request) => {
    const { sessionId } = request.cookies

    const summary = await knex('transactions')
      .sum('amount', { as: 'amount' })
      .where('session_id', sessionId)
      .first()

    return { summary }
  })

  app.post('/', async (request, reply) => {
    const BodyTypes = Zod.object({
      title: Zod.string(),
      amount: Zod.number(),
      type: Zod.enum(['credit', 'debit'])
    })

    const { title, amount, type } = BodyTypes.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, //! Cookies expires in 1 week
      })
    }

    await knex('transactions')
      .insert({
        id: randomUUID(),
        title,
        amount: type === 'credit' ? amount : amount * -1,
        session_id: sessionId
      })

    return reply.status(201).send()
  })
}
