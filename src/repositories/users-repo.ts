import { Prisma, User } from '@prisma/client'

//? Setting up a well-typed methods 

export interface UsersRepo {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User> 
}