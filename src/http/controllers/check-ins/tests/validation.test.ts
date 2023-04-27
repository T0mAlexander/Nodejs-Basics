import { app } from '@app'
import { Prisma } from '@lib/prisma'
import { CreateAuthUser } from '@utils/create-auth-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Check-in validation (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('Validation of a check-in on a gym', async () => {
    const { token } = await CreateAuthUser(app, true)

    const user = await Prisma.user.findFirstOrThrow()

    const gym = await Prisma.gym.create({
      data: {
        name: 'Docker Gym',
        latitude: -19.875765,
        longitude: -44.0477851
      }
    })

    let checkIn = await Prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id
      }
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    checkIn = await Prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id
      }
    })

    expect(checkIn.validation_date).toEqual(expect.any(Date))
  })
})