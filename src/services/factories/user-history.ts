import { PrismaCheckInRepository } from '@repositories/prisma/check-in'
import { CheckInHistoryUseCase } from '@services/history'

export function GetUserCheckInsHistory () {
  const PrismaCheckInsRepo = new PrismaCheckInRepository()
  const useCase = new CheckInHistoryUseCase(PrismaCheckInsRepo)

  return useCase
}