import { User } from '@prisma/client'
import { PrismaUsersRepository } from '@repositories/prisma/users'
import { ResourceNotFoundError } from '@services/errors/resource'

interface UserProfileCaseRequest {
  id: string
}

interface UserProfileCaseResponse {
  User: User
}

export class GetUserProfileCase {
  constructor(
    private UsersRepository: PrismaUsersRepository) { }

  async execute({ id }: UserProfileCaseRequest): Promise<UserProfileCaseResponse> {
    const User = await this.UsersRepository.findById(id)

    if (!User) {
      throw new ResourceNotFoundError()
    }

    return { User }
  }
}