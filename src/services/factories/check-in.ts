import { PrismaCheckInRepository } from '@repositories/prisma/check-in'
import { PrismaGymsRepository } from '@repositories/prisma/gyms'
import { CheckInUseCase } from '@services/check-in'

export function GetCheckIn () {
  const PrismaCheckInsRepo = new PrismaCheckInRepository()
  const PrismaGymsRepo = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(PrismaCheckInsRepo, PrismaGymsRepo)

  return useCase
}