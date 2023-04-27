import { User, Prisma } from '@prisma/client'
import { UsersRepo } from '@repositories/users-repo'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepo implements UsersRepo {
  public item: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.item.find(item => item.id === id)

    if(!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.item.find(item => item.email === email)

    if(!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      creation_date: new Date()
    }

    this.item.push(user)
    return user
  }
  
}