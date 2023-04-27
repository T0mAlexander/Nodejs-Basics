import { PrismaCheckInRepository } from '@repositories/prisma/check-in'
import { UserMetricsUseCase } from '@services/user-metrics'

export function GetUserMetrics () {
  const PrismaCheckInsRepo = new PrismaCheckInRepository()
  const useCase = new UserMetricsUseCase(PrismaCheckInsRepo)

  return useCase
}