export class UserAlreadyExistsError extends Error {
  constructor () {
    super('Email address already exists!')
  }
}