let char = String.fromCharCode(128)

console.log(Buffer.from('woA=', 'base64').toString('ascii'))