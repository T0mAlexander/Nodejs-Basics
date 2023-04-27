import { app } from '@app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Register (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('Registration', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'User',
        email: 'user@email.com',
        password: '123456'
      })

    expect(response.statusCode).toBe(201)
  })
})