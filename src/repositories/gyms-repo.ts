import { Gym, Prisma } from '@prisma/client'

export interface NearbyGymsCoords {
  latitude: number
  longitude: number
}

export interface GymRepository {
  findById(userId: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchGyms(query: string, page: number): Promise<Gym[]>
  findNearbyGyms(params: NearbyGymsCoords): Promise<Gym[]>
}