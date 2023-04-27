import { beforeEach, describe, expect, test } from 'vitest'
import { AuthUseCase } from '@services/authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '@services/errors/credentials'
import { InMemoryUsersRepo } from '@repositories/memory/user'

let authRepo: InMemoryUsersRepo
let SysUnderTest: AuthUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    authRepo = new InMemoryUsersRepo()
    SysUnderTest = new AuthUseCase(authRepo)
  })

  test('user authentication', async () => {
    await authRepo.create({
      name: 'Ayrton Senna',
      email: 'ayrtonsenna@f1.com',
      password_hash: await hash('corinthians12', 6)
    })

    const { User } = await SysUnderTest.execute({
      email: 'ayrtonsenna@f1.com',
      password: 'corinthians12'
    })

    expect(User.id).toEqual(expect.any(String))
  })

  test('incorrect email authentication prevention', async () => {
    await expect(() => SysUnderTest.execute({
      email: 'ayrtonsenna@f1.com',
      password: 'corinthians12'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  test('incorrect password authentication prevention', async () => {
    await expect(() => SysUnderTest.execute({
      email: 'ayrtonsenna@f1.com',
      password: 'corinthians12'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})