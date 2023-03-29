import { config } from 'dotenv'
import { z as Zod } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const EnvSchema = Zod.object({
  NODE_ENV: Zod.enum(['dev', 'test', 'production']).default('production'),
  DATABASE_URL: Zod.string(),
  PORT: Zod.number().default(3333)
})

const _Env = EnvSchema.safeParse(process.env)

if (_Env.success === false) {
  console.error('⚠️ Invalid environment variables!', _Env.error.format())

  throw new Error('⚠️ Invalid environment variables!')

}

export const Env = _Env.data