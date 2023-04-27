import { app } from '@app'
import { Prisma } from '@lib/prisma'
import { CreateAuthUser } from '@utils/create-auth-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Create Check-in (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('Scheduling a check-in on a gym', async () => {
    const { token } = await CreateAuthUser(app)

    const gym = await Prisma.gym.create({
      data: {
        name: 'Docker Gym',
        latitude: -19.875765,
        longitude: -44.0477851
      }
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -19.875765,
        longitude: -44.0477851
      })

    expect(response.statusCode).toEqual(201)
  })
})