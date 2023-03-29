import { app } from './app'
import { Env } from './env'

app.listen({
  port: Env.PORT,
}).then(() => {
  console.log('Server is running 🚀')
})
