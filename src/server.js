import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { ExtractQueryParams } from './utils/extract-query-params.js'

const server = http.createServer(async (request, response) => {
  const {url, method} = request

  await json(request, response)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if(route) {
    const RouteParams = request.url.match(route.path)

    // console.log(ExtractQueryParams(RouteParams.groups.query))

    const { query, ...parameters } = RouteParams.groups

    request.parameters = parameters
    request.query = query ? ExtractQueryParams(query) : {}

    return route.handler(request, response)
  }

  console.log(route)

  return response.writeHead(404).end()
})

server.listen(3333)
