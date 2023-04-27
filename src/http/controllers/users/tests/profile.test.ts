import { app } from '@app'
import { CreateAuthUser } from '@utils/create-auth-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Profile (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('User Profile View', async () => {
    const { token } = await CreateAuthUser(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.User).toEqual(expect.objectContaining({
      email: 'user@email.com'
    }))
  })
})