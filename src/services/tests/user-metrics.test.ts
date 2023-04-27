import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryCheckInRepo } from '@repositories/memory/check-in'
import { UserMetricsUseCase } from '@services/user-metrics'

let checkInRepo: InMemoryCheckInRepo
let SysUnderTest: UserMetricsUseCase

describe('User metrics counting', () => {
  beforeEach(async () => {
    checkInRepo = new InMemoryCheckInRepo()
    SysUnderTest = new UserMetricsUseCase(checkInRepo)
  })

  test('User check-ins metrics count', async () => {
    await checkInRepo.create({
      gym_id: 'gym-1',
      user_id: 'user-1'
    })

    await checkInRepo.create({
      gym_id: 'gym-2',
      user_id: 'user-1'
    })

    const { checkInCount } = await SysUnderTest.execute({
      userId: 'user-1'
    })

    expect(checkInCount).toEqual(2)
  })
})