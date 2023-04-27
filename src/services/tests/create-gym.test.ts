import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryGymRepo } from '@repositories/memory/gyms'
import { CreateGymUseCase } from '@services/create-gym'

let gymRepo: InMemoryGymRepo
let SysUnderTest: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymRepo = new InMemoryGymRepo()
    SysUnderTest = new CreateGymUseCase(gymRepo)
  })

  test('Gym Creation', async () => {
    const { gym } = await SysUnderTest.execute({
      name: 'Typescritp Gym',
      description: 'Exercise your brain here!',
      phone: null,
      latitude: -19.9247568,
      longitude: -43.9466469
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})