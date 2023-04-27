import { beforeEach, describe, expect, test } from 'vitest'
import { SearchGymUseCase } from '@services/search-gym'
import { InMemoryGymRepo } from '@repositories/memory/gyms'

let gymsRepo: InMemoryGymRepo
let SysUnderTest: SearchGymUseCase

describe('Search Gyms Case', () => {
  beforeEach(async () => {
    gymsRepo = new InMemoryGymRepo()
    SysUnderTest = new SearchGymUseCase(gymsRepo)
  })

  test('User check-ins history query', async () => {
    await gymsRepo.create({
      name: 'Node.js Gym',
      description: 'Exercise your brain here!',
      phone: null,
      latitude: -19.9247568,
      longitude: -43.9466469
    })

    await gymsRepo.create({
      name: 'Github Gym',
      description: 'Exercise your brain here!',
      phone: null,
      latitude: -19.9247568,
      longitude: -43.9466469
    })

    const { gyms } = await SysUnderTest.execute({
      query: 'Node.js',
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({name: 'Node.js Gym'}),
    ])
  })

  test('Paginated gym search', async () => {
    for (let x = 1; x <= 22; x++) {
      await gymsRepo.create({
        name: `Node.js Gym ${x}`,
        description: 'Exercise your brain here!',
        phone: null,
        latitude: -19.9247568,
        longitude: -43.9466469
      })
    }

    const { gyms } = await SysUnderTest.execute({
      query: 'Node.js',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({name: 'Node.js Gym 21'}),
      expect.objectContaining({name: 'Node.js Gym 22'})
    ])
  })
})