import { PrismaGymsRepository } from '@repositories/prisma/gyms'
import { SearchGymUseCase } from '@services/search-gym'

export function SearchGymsByName () {
  const PrismaGymsRepo = new PrismaGymsRepository()
  const useCase = new SearchGymUseCase(PrismaGymsRepo)

  return useCase
}