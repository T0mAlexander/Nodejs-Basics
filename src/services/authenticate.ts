import { PrismaUsersRepository } from '@repositories/prisma/users'
import { InvalidCredentialsError } from './errors/credentials'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthRequest {
  email: string
  password: string
}

interface AuthResponse {
  User: User
}

export class AuthUseCase {
  constructor(
    private UsersRepository: PrismaUsersRepository) { }

  async execute({ email, password }: AuthRequest): Promise<AuthResponse> {
    const User = await this.UsersRepository.findByEmail(email)

    if (!User) {
      throw new InvalidCredentialsError()
    }

    const DidPasswordMatch = compare(password, User.password_hash)

    if (!DidPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { User }
  }
}