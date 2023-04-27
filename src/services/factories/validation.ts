import { PrismaCheckInRepository } from '@repositories/prisma/check-in'
import { ValidateCheckInUseCase } from '@services/validate-check-in'

export function CheckInValidation () {
  const PrismaCheckInsRepo = new PrismaCheckInRepository()
  const useCase = new ValidateCheckInUseCase(PrismaCheckInsRepo)

  return useCase
}