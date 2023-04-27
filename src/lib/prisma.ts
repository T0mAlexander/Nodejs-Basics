import { PrismaClient } from '@prisma/client'
import { Env } from 'env'

export const Prisma = new PrismaClient({
  log: Env.NODE_ENV === 'dev' ? ['query'] : []
})