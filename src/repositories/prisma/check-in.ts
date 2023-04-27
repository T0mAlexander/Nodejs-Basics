import { Prisma as prisma } from '@lib/prisma'
import { Prisma, CheckIn } from '@prisma/client'
import { CheckInRepository } from '@repositories/check-in-repo'
import dayjs from 'dayjs'

export class PrismaCheckInRepository implements CheckInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data
    })
    
    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data
    })

    return checkIn
  }

  async findByIdAndDate(userId: string, date: Date) {
    const dayStart = dayjs(date).startOf('date')
    const dayEnd = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        creation_date: {
          gte: dayStart.toDate(),
          lte: dayEnd.toDate()
        }
      }
    })

    return checkIn
  }

  async userHistoric(userId: string, page: number) {
    const checkInHistory = await prisma.checkIn.findMany({
      where: {
        user_id: userId
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return checkInHistory
  }

  async checkInsCount(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    })

    return count
  }

  async findCheckIn(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id
      }
    })

    return checkIn
  }
}