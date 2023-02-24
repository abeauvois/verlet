// Nodejs only

const dir = _dirname

console.log(dir)

const getFile = (filename) => {
  return readfileSync(filename)
}
