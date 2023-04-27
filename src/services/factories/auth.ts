import { PrismaUsersRepository } from '@repositories/prisma/users'
import { AuthUseCase } from '@services/authenticate'

export function MakeAuthCase () {
  const PrismaUsersRepo = new PrismaUsersRepository()
  const AuthCase = new AuthUseCase(PrismaUsersRepo)

  return AuthCase
}