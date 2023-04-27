import { Prisma, CheckIn } from '@prisma/client'
import { CheckInRepository } from '@repositories/check-in-repo'
import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInRepo implements CheckInRepository {
  async findByIdAndDate(userId: string, date: Date) {
    const dayStart = dayjs(date).startOf('date')
    const dayEnd = dayjs(date).endOf('date')

    const checkInOnSameDate = this.item.find((checkIn) => {
      const checkInDate = dayjs(checkIn.creation_date)
      const sameDate = checkInDate.isAfter(dayStart) && checkInDate.isBefore(dayEnd)

      return checkIn.user_id === userId && sameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }
  public item: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validation_date: data.validation_date ? new Date(data.validation_date) : null,
      creation_date: new Date()
    }

    this.item.push(checkIn)
    return checkIn
  }

  async userHistoric(userId: string, page: number) {
    return this.item.filter(item => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async checkInsCount(userId: string) {
    return this.item.filter(item => item.user_id === userId).length
  }

  async findCheckIn(id: string) {
    const checkIn = this.item.find(item => item.id === id)

    if(!checkIn) {
      return null
    }

    return checkIn
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.item.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.item[checkInIndex] = checkIn
    }

    return checkIn
  }
}