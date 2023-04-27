import { app } from '@app'
import { CreateAuthUser } from '@utils/create-auth-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Search Gyms(E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('Search gyms by name', async () => {
    const { token } = await CreateAuthUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Node.js Gym',
        description: 'Train your Node skills here!',
        phone: '(12) 3456-7890',
        latitude: -19.875765,
        longitude: -44.0477851
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Typescript Gym',
        description: 'Train your TS skills here!',
        phone: '(12) 3456-7890',
        latitude: -19.875765,
        longitude: -44.0477851
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'Node.js'
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: 'Node.js Gym'
      })
    ])
  })
})