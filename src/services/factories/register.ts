import { PrismaUsersRepository } from '@repositories/prisma/users'
import { RegisterUseCase } from '@services/register'

export function MakeRegisterCase () {
  const PrismaUsersRepo = new PrismaUsersRepository()
  const RegisterCase = new RegisterUseCase(PrismaUsersRepo)

  return RegisterCase
}