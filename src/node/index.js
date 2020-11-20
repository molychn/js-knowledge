// process.stdin.pipe(process.stdout)
// console.log(process.argv)
process.nextTick(console.log, 4);
setImmediate(console.log, 1);
setTimeout(console.log, 1, 2);
Promise.resolve(3).then(console.log);

console.log(5);