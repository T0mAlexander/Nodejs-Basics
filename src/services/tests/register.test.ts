import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from '../register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from '@services/errors/register'
import { InMemoryUsersRepo } from '@repositories/memory/user'

let usersRepo: InMemoryUsersRepo
let SysUnderTest: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepo = new InMemoryUsersRepo()
    SysUnderTest = new RegisterUseCase(usersRepo)
  })

  it('should register a new user', async () => {
    const { user } = await SysUnderTest.execute({
      name: 'Lewis Hamilton',
      email: 'lh44@f1.com',
      password: 'mercedes'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash the new user password on database', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail() {
        return null
      },

      async findById() {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          creation_date: new Date()
        }
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'Lewis Hamilton',
      email: 'lh44@f1.com',
      password: 'mercedes'
    })

    const CompareHashedPassword = await compare(
      'mercedes', user.password_hash
    )

    expect(CompareHashedPassword).toBe(true)
  })

  it('should prevent duplicated emails', async () => {
    const email = 'example@email.com'

    await SysUnderTest.execute({
      name: 'Example User',
      email,
      password: '123456'
    })

    await expect(() =>
      SysUnderTest.execute({
        name: 'John Doe',
        email,
        password: '123456'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})