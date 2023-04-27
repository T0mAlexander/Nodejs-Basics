import { PrismaUsersRepository } from '@repositories/prisma/users'
import { GetUserProfileCase } from '@services/user-profile'

export function GetUserProfile () {
  const PrismaUsersRepo = new PrismaUsersRepository()
  const useCase = new GetUserProfileCase(PrismaUsersRepo)

  return useCase
}