import { knex as SetupKnex, Knex } from 'knex'
import { Env } from './env'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: Env.DATABASE_URL
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './database/migrations'
  }
}

export const knex = SetupKnex(config)