export class CheckInLimitError extends Error {
  constructor() {
    super('Max number of check-ins reached')
  }
}