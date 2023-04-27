import { app } from '@app'
import { Env } from '../env/index'

app.listen({
  host: '0.0.0.0', //? Acessible host address for front-end purposes
  port: Env.PORT,  //? Default server port 
}).then(() => {
  console.log('Node server is running 🚀')
})