import { beforeEach, describe, expect, test } from 'vitest'
import { SearchNearbyGymsUseCase } from '@services/nearby-gyms'
import { InMemoryGymRepo } from '@repositories/memory/gyms'

let gymsRepo: InMemoryGymRepo
let SysUnderTest: SearchNearbyGymsUseCase

describe('Search nearby gyms case', () => {
  beforeEach(async () => {
    gymsRepo = new InMemoryGymRepo()
    SysUnderTest = new SearchNearbyGymsUseCase(gymsRepo)
  })

  test('Nearby gyms search', async () => {
    await gymsRepo.create({
      name: 'Nearest Gym',
      description: 'Exercise your brain here!',
      phone: null,
      latitude: -19.8800628,
      longitude: -44.0371687
    })

    await gymsRepo.create({
      name: 'Farthest Gym',
      description: 'Exercise your brain here!',
      phone: null,
      latitude: -19.946022,
      longitude: -43.9089803
    })

    const { gyms } = await SysUnderTest.execute({
      userCurrentLatitude: -19.875765,
      userCurrentLongitude: -44.0477851
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Nearest Gym' })])
  })
})