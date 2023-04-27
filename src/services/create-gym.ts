import { Gym } from '@prisma/client'
import { GymRepository } from '../repositories/gyms-repo'

interface CreateGymRequest {
  name: string
  description?: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private GymRepo: GymRepository) { }

  async execute({ name, description, phone, latitude, longitude }: CreateGymRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.GymRepo.create({
      name, description, phone, latitude, longitude
    })

    return {
      gym
    }
  }
}