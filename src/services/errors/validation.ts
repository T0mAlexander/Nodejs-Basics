export class CheckInValidationTimeError extends Error {
  constructor () {
    super('Check-in expired. Please, issue a new one')
  }
}