import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  save(checkIn: CheckIn): Promise<CheckIn>
  findByIdAndDate(userId: string, date: Date): Promise<CheckIn | null>
  userHistoric(userId: string, page: number): Promise<CheckIn[]>
  checkInsCount(userId: string): Promise<number>
  findCheckIn(userId: string): Promise<CheckIn | null>
}