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

  test('Search nearby gyms', async () => {
    const { token } = await CreateAuthUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Node.js Gym',
        description: 'Train your Node skills here!',
        phone: '(12) 3456-7890',
        latitude: -19.8768197,
        longitude: -44.0305511
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Typescript Gym',
        description: 'Train your TS skills here!',
        phone: '(12) 3456-7890',
        latitude: -19.9026266,
        longitude: -43.9042022
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -19.8768197,
        longitude: -44.0305511
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