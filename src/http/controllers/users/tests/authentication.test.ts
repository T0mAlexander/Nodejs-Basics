import { app } from '@app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Authentication (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('Session Validation', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'User',
        email: 'user@email.com',
        password: '123456'
      })

    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'user@email.com',
        password: '123456'
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
})