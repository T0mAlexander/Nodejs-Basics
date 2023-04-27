import { CheckInRepository } from '@repositories/check-in-repo'

interface UserMetricsRequest {
  userId: string
}

interface UserMetricsResponse {
  checkInCount: number
}

export class UserMetricsUseCase {
  constructor(private CheckInsRepository: CheckInRepository) { }
  async execute({ userId }: UserMetricsRequest): Promise<UserMetricsResponse> {
    const checkInCount = await this.CheckInsRepository.checkInsCount(userId)

    return { checkInCount }
  }
}