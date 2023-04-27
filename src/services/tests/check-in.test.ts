import { afterEach, beforeEach, describe, expect, test, vi as Vitest } from 'vitest'
import { CheckInUseCase } from '@services/check-in'
import { InMemoryCheckInRepo } from '@repositories/memory/check-in'
import { MaxDistanceError } from '@services/errors/distance'
import { Decimal } from '@prisma/client/runtime/library'
import { CheckInLimitError } from '@services/errors/check-in'
import { InMemoryGymRepo } from '@repositories/memory/gyms'

let checkInRepo: InMemoryCheckInRepo
let gymsRepo: InMemoryGymRepo
let SysUnderTest: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInRepo = new InMemoryCheckInRepo()
    gymsRepo = new InMemoryGymRepo()
    SysUnderTest = new CheckInUseCase(checkInRepo, gymsRepo)

    await gymsRepo.create({
      id: 'gym-1',
      name: 'Node.js Academy',
      description: 'practice your brain here!',
      phone: '',
      latitude: -19.9247568,
      longitude: -43.9466469
    })

    Vitest.useFakeTimers()
  })

  afterEach(() => {
    Vitest.useRealTimers()
  })

  test('Check-in creation', async () => {

    const { checkIn } = await SysUnderTest.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userCurrentLatitude: -19.9247568,
      userCurrentLongitude: -43.9466469
    })

    console.log(checkIn.creation_date)
    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('New check-in available after 24h', async () => {
    Vitest.setSystemTime(new Date(2023, 0, 1, 9, 0, 0))

    await SysUnderTest.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userCurrentLatitude: -19.9247568,
      userCurrentLongitude: -43.9466469
    })

    await expect(() =>
      SysUnderTest.execute({
        gymId: 'gym-1',
        userId: 'user-1',
        userCurrentLatitude: -19.9247568,
        userCurrentLongitude: -43.9466469
      })).rejects.toBeInstanceOf(CheckInLimitError)
  })

  test('Check-in creation on distant gym', async () => {
    await gymsRepo.item.push({
      id: 'gym-2',
      name: 'Node.js Academy',
      description: 'practice your brain here!',
      phone: null,
      latitude: new Decimal(-19.9247568),
      longitude: new Decimal(-43.9466469)
    })

    await expect(() => SysUnderTest.execute({
      gymId: 'gym-2',
      userId: 'user-1',
      userCurrentLatitude: -19.9170902,
      userCurrentLongitude: -43.955936
    })).rejects.toBeInstanceOf(MaxDistanceError)
  })
})