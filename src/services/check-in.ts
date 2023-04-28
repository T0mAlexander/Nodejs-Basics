import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@repositories/check-in-repo'
import { GymRepository } from '@repositories/gyms-repo'
import { ResourceNotFoundError } from './errors/resource'
import { CheckInLimitError } from './errors/check-in'
import { DistanceBetweenCoordinates } from '@utils/coords-distance'
import { MaxDistanceError } from './errors/distance'

interface CheckInRequest {
  userId: string
  gymId: string
  userCurrentLatitude: number
  userCurrentLongitude: number
}

interface CheckInResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private CheckInRepository: CheckInRepository, private GymsRepository: GymRepository) { }
  async execute({ userId, gymId, userCurrentLatitude, userCurrentLongitude }: CheckInRequest): Promise<CheckInResponse> {
    const gym = await this.GymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = DistanceBetweenCoordinates({
      latitude: userCurrentLatitude,
      longitude: userCurrentLongitude
    }, {
      latitude: gym.latitude.toNumber(),
      longitude: gym.longitude.toNumber()
    })

    const MaxDistanceInKm = 0.25 //* 250 meters

    if (distance > MaxDistanceInKm) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDate = await this.CheckInRepository.findByIdAndDate(
      userId,
      new Date()
    )

    if (checkInOnSameDate) {
      throw new CheckInLimitError()
    }

    const checkIn = await this.CheckInRepository.create({
      gym_id: gymId,
      user_id: userId
    })

    return { checkIn }
  }
}