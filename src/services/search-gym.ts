import { Gym } from '@prisma/client'
import { GymRepository } from '../repositories/gyms-repo'

interface SearchGymRequest {
  query: string
  page: number
}

interface SearchGymResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private GymRepo: GymRepository) { }

  async execute({ query, page }: SearchGymRequest): Promise<SearchGymResponse> {
    const gyms = await this.GymRepo.searchGyms(query, page)

    return {
      gyms
    }
  }
}