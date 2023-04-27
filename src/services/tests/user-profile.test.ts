import { beforeEach, describe, expect, test } from 'vitest'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '@services/errors/resource'
import { InMemoryUsersRepo } from '@repositories/memory/user'
import { GetUserProfileCase } from '@services/user-profile'

let usersRepo: InMemoryUsersRepo
let SysUnderTest: GetUserProfileCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepo = new InMemoryUsersRepo()
    SysUnderTest = new GetUserProfileCase(usersRepo)
  })

  test('user profile acquisition', async () => {
    const createdUser = await usersRepo.create({
      name: 'Ayrton Senna',
      email: 'ayrtonsenna@f1.com',
      password_hash: await hash('corinthians12', 6)
    })

    const { User } = await SysUnderTest.execute({
      id: createdUser.id
    })

    expect(User.id).toEqual(expect.any(String))
    expect(User.name).toEqual('Ayrton Senna')
  })

  test('user profile acquisition with wrong or null id', async () => {
    await expect(() => SysUnderTest.execute({
      id: 'id-doesnt-exists'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})