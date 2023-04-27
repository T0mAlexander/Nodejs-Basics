import { afterEach, beforeEach, describe, expect, test, vi as Vitest } from 'vitest'
import { ValidateCheckInUseCase } from '@services/validate-check-in'
import { ResourceNotFoundError } from '@services/errors/resource'
import { InMemoryCheckInRepo } from '@repositories/memory/check-in'

let checkInRepo: InMemoryCheckInRepo
let SysUnderTest: ValidateCheckInUseCase

describe('Check-in Validation', () => {
  beforeEach(async () => {
    checkInRepo = new InMemoryCheckInRepo()
    SysUnderTest = new ValidateCheckInUseCase(checkInRepo)

    Vitest.useFakeTimers()
  })

  afterEach(() => {
    Vitest.useRealTimers()
  })

  test('Check-in validation', async () => {
    const createdCheckIn = await checkInRepo.create({
      gym_id: 'gym-1',
      user_id: 'user-1',
    })

    await SysUnderTest.execute({
      checkInID: createdCheckIn.id
    })

    expect(createdCheckIn.validation_date).toEqual(expect.any(Date))
    expect(checkInRepo.item[0].validation_date).toEqual(expect.any(Date))
  })

  test('Inexistent check-in validation', async () => {
    await expect(() => SysUnderTest.execute({
      checkInID: '???'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  test('Check-in validation prevention after 20 minutes', async () => {
    Vitest.setSystemTime(new Date(2023, 0, 1, 6, 0))

    const createdCheckIn = await checkInRepo.create({
      gym_id: 'gym-1',
      user_id: 'user-1'
    })

    const twentyOnePilots = 1000 * 60 * 21 // = 21 minutes
    Vitest.advanceTimersByTime(twentyOnePilots)

    await expect(() => SysUnderTest.execute({
      checkInID: createdCheckIn.id
    })).rejects.toBeInstanceOf(Error)
  })
})