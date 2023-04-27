export interface Coordinate {
  latitude: number
  longitude: number
}

//? Haversine Formula
export function DistanceBetweenCoordinates(from: Coordinate, to: Coordinate) {

  //! If they're the same, the distance is ZERO and functions will end here due the 'return' keyword
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  //? If they're different, lat and long will be converted as radians and formula will be applied 
  const fromRadian = (Math.PI * from.latitude) / 180
  const toRadian = (Math.PI * to.latitude) / 180

  const theta = from.longitude - to.longitude
  const radTheta = (Math.PI * theta) / 180

  let Distance =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

  if (Distance > 1) {
    Distance = 1
  }

  Distance = Math.acos(Distance)
  Distance = (Distance * 180) / Math.PI
  Distance = Distance * 60 * 1.1515
  Distance = Distance * 1.609344 //? INFO: This constant is converting miles to kilometers as the default output unit

  return Distance
}