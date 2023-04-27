import { app } from '@app'
import { CreateAuthUser } from '@utils/create-auth-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Create Gym(E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('Creating a new gym', async () => {
    const { token } = await CreateAuthUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Node.js Gym',
        description: 'Train your Node skills here!',
        phone: '(12) 3456-7890',
        latitude: -19.875765,
        longitude: -44.0477851
      })

    expect(response.statusCode).toEqual(201)
  })
})