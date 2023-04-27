import { app } from '@app'
import { Prisma } from '@lib/prisma'
import { CreateAuthUser } from '@utils/create-auth-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Check-in Metrics (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('Getting the user check-in metrics', async () => {
    const { token } = await CreateAuthUser(app)

    const user = await Prisma.user.findFirstOrThrow()

    const gym = await Prisma.gym.create({
      data: {
        name: 'Docker Gym',
        latitude: -19.875765,
        longitude: -44.0477851
      },
    })

    await Prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInCount).toEqual(2)
  })
})