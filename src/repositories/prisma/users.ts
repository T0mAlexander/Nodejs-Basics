import { Prisma } from '@prisma/client'
import { Prisma as prisma } from '@lib/prisma'
import { UsersRepo } from '@repositories/users-repo'

export class PrismaUsersRepository implements UsersRepo {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })

    return user
  }
}