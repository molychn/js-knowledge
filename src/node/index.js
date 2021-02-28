const fs = require('fs')

const rs = fs.createReadStream('./test.txt', {
  start: 11,
  end: 36
})

rs.on('open', fd => {
  console.log(`file desc char ${fd} set`)
})
rs.on('ready', () => {
  console.log('file ready')
})
rs.on('data', chunk => {
  console.log(`file data: ${chunk.toString()}`)
})
rs.on('end', () => {
  console.log('file read finish')
})
rs.on('close', () => {
  console.log('file close')
})
rs.on('error', err => {
  console.log(`error: ${err.stack()}`)
})