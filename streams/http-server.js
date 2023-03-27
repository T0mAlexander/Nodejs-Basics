import http from 'node:http'
import { Transform } from 'node:stream'

class inv extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    callback(null, Buffer.from(String(transformed)))
  }
}

const server = http.createServer(async (request, response) => {
  const buffers = []

  for await (const chunk of request) {
    buffers.push(chunk)
  }

  const StreamContent = Buffer.concat(buffers).toString()
  console.log(StreamContent)

  return response.end(StreamContent)
})

server.listen(3001)
