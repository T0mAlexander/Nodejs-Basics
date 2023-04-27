import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryCheckInRepo } from '@repositories/memory/check-in'
import { CheckInHistoryUseCase } from '@services/history'

let checkInRepo: InMemoryCheckInRepo
let SysUnderTest: CheckInHistoryUseCase

describe('Fetching check-ins history', () => {
  beforeEach(async () => {
    checkInRepo = new InMemoryCheckInRepo()
    SysUnderTest = new CheckInHistoryUseCase(checkInRepo)
  })

  test('User check-ins history query', async () => {
    await checkInRepo.create({
      gym_id: 'gym-1',
      user_id: 'user-1'
    })

    await checkInRepo.create({
      gym_id: 'gym-2',
      user_id: 'user-1'
    })

    const { checkInHistory } = await SysUnderTest.execute({
      userId: 'user-1',
      page: 1
    })

    expect(checkInHistory).toHaveLength(2)
    expect(checkInHistory).toEqual([
      expect.objectContaining({gym_id: 'gym-1'}),
      expect.objectContaining({gym_id: 'gym-2'})
    ])
  })

  test('User check-ins history pagination', async () => {
    for (let x = 1; x <= 22; x++) {
      await checkInRepo.create({
        gym_id: `gym-${x}`,
        user_id: 'user-1'
      })
    }

    const { checkInHistory } = await SysUnderTest.execute({
      userId: 'user-1',
      page: 2
    })

    expect(checkInHistory).toHaveLength(2)
    expect(checkInHistory).toEqual([
      expect.objectContaining({gym_id: 'gym-21'}),
      expect.objectContaining({gym_id: 'gym-22'})
    ])
  })
})