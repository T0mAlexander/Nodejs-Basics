import { PrismaGymsRepository } from '@repositories/prisma/gyms'
import { CreateGymUseCase } from '@services/create-gym'

export function CreateGym () {
  const PrismaGymsRepo = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(PrismaGymsRepo)

  return useCase
}