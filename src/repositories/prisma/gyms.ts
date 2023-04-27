import { Prisma as prisma } from '@lib/prisma'
import { Gym, Prisma } from '@prisma/client'
import { GymRepository, NearbyGymsCoords } from '@repositories/gyms-repo'

export class PrismaGymsRepository implements GymRepository {
  async findById(userId: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id: userId
      }
    })

    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data
    })

    return gym
  }

  async searchGyms(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        name: {
          contains: query
        }
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return gyms
  }

  async findNearbyGyms({ latitude, longitude }: NearbyGymsCoords) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gym
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }
}