import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@repositories/check-in-repo'
import { ResourceNotFoundError } from './errors/resource'
import dayjs from 'dayjs'
import { CheckInValidationTimeError } from './errors/validation'

interface ValidateCheckInRequest {
  checkInID: string
}

interface ValidateCheckInResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private CheckInsRepository: CheckInRepository) { }

  async execute({ checkInID }: ValidateCheckInRequest): Promise<ValidateCheckInResponse> {
    const checkIn = await this.CheckInsRepository.findCheckIn(checkInID)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const validationTimeRemaining = dayjs(new Date()).diff(
      checkIn.creation_date,
      'minutes'
    )

    if (validationTimeRemaining > 20) {
      throw new CheckInValidationTimeError()
    }

    checkIn.validation_date = new Date()
    await this.CheckInsRepository.save(checkIn)
    return { checkIn }
  }
}