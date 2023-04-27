import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@repositories/check-in-repo'

interface CheckInHistoryRequest {
  userId: string
  page: number
}

interface CheckInHistoryResponse {
  checkInHistory: CheckIn[]
}

export class CheckInHistoryUseCase {
  constructor(private CheckInsRepository: CheckInRepository) { }
  async execute({ userId, page }: CheckInHistoryRequest): Promise<CheckInHistoryResponse> {
    const checkInHistory = await this.CheckInsRepository.userHistoric(userId, page)

    return { checkInHistory }
  }
}