import { Gym, Prisma } from '@prisma/client'
import { GymRepository, NearbyGymsCoords } from '@repositories/gyms-repo'
import { DistanceBetweenCoordinates } from '@utils/coords-distance'
import { randomUUID } from 'node:crypto'

export class InMemoryGymRepo implements GymRepository {
  public item: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.item.find(item => item.id === id)

    if(!gym) {
      return null
    }

    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ??  randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      creation_date: new Date()
    }

    this.item.push(gym)

    return gym
  }

  async searchGyms(query: string, page: number) {
    return this.item.filter(item => item.name.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findNearbyGyms(params: NearbyGymsCoords) {
    return this.item.filter((item) => {
      const minKm = 10
      const distanceRadius = DistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        { latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber() }
      )

      console.log(`${distanceRadius} km`)
      return distanceRadius < minKm
    })
  }
}