import { Gym } from '@prisma/client'
import { GymRepository } from '../repositories/gyms-repo'

interface SearchNearbyGymsRequest {
  userCurrentLatitude: number
  userCurrentLongitude: number
}

interface SearchNearbyGymsResponse {
  gyms: Gym[]
}

export class SearchNearbyGymsUseCase {
  constructor(private GymRepo: GymRepository) { }

  async execute({ userCurrentLatitude, userCurrentLongitude }: SearchNearbyGymsRequest): Promise<SearchNearbyGymsResponse> {
    const gyms = await this.GymRepo.findNearbyGyms({
      latitude: userCurrentLatitude,
      longitude: userCurrentLongitude
    })

    return {
      gyms
    }
  }
}