import { Readable, Transform, Writable } from "node:stream"

class onetohundred extends Readable {
  index = 1

  _read() {
    const x = this.index++

    setTimeout(() => {
      if (x > 100) {
        this.push(null)
      } else {
        const buffer = Buffer.from(String(x))

        this.push(buffer)
      }
    }, 1000)
  }
}

class inv extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1
    callback(null, Buffer.from(String(transformed)))
  }
}

class multi extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new onetohundred()
  .pipe(new inv)
  .pipe(new multi)