import 'dotenv/config'
import { z as Zod } from 'zod'

const EnvSchema = Zod.object({
  NODE_ENV: Zod.enum(['dev', 'test', 'production']).default('dev'), //? Informing the 3 types of environments
  JWT_SECRET: Zod.string(),
  PORT: Zod.coerce.number().default(3333), //? Port value to convert into a number
})

const _Env = EnvSchema.safeParse(process.env)

if (_Env.success === false) {
  console.error('❌ Invalid environment variables', _Env.error.format())

  throw new Error('Invalid environment variables')
}

export const Env = _Env.data