import { Readable } from 'node:stream'

class counting extends Readable {
  index = 1

  _read() {
    const x = this.index++

    setTimeout(() => {
      if (x > 3) {
        this.push(null)
      } else {
        const buffer = Buffer.from(String(x))

        this.push(buffer)
      }
    }, 1000)
  }
}

fetch('http://localhost:3001', {
  method: 'POST',
  body: new counting(),
  duplex: 'half',
}).then(response => {
  response.text()
}).then(data => {
  console.log(data)
})