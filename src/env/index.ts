import { config } from 'dotenv'
import { z as Zod } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const EnvSchema = Zod.object({
  NODE_ENV: Zod.enum(['dev', 'test', 'production']).default('production'),
  DATABASE_CLIENT: Zod.enum(['sqlite', 'pg']), //? SQLite is the default database in dev environment, while PSQL is for production environment
  DATABASE_URL: Zod.string(),
  PORT: Zod.coerce.number().default(3333) //? Zod Coerce forces conversion from number to string
})

const _Env = EnvSchema.safeParse(process.env)

if (_Env.success === false) {
  console.error('⚠️ Invalid environment variables!', _Env.error.format())

  throw new Error('⚠️ Invalid environment variables!')

}

export const Env = _Env.data