import { PrismaGymsRepository } from '@repositories/prisma/gyms'
import { SearchNearbyGymsUseCase } from '@services/nearby-gyms'

export function SearchNearbyGyms () {
  const PrismaGymsRepo = new PrismaGymsRepository()
  const useCase = new SearchNearbyGymsUseCase(PrismaGymsRepo)

  return useCase
}