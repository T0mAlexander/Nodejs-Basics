import { User } from '@prisma/client'
import { UserAlreadyExistsError } from '@services/errors/register'
import { UsersRepo } from '@repositories/users-repo'
import { hash } from 'bcryptjs'

interface RegisterRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private UsersRepo: UsersRepo) { }

  async execute({ name, email, password }: RegisterRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const PreventSameEmailRegister = await this.UsersRepo.findByEmail(email)

    if (PreventSameEmailRegister) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.UsersRepo.create({
      name,
      email,
      password_hash
    })

    return {
      user
    }
  }
}