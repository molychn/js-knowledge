console.log(1);

const promise = new Promise(resolve => {
  console.log(2);
  resolve();
  console.log(3);
});

async function foo () {
  console.log(4);
  await promise;
  console.log(6);
};
foo();

promise.then(() => {
  console.log(7);
});

setTimeout(() => {
  console.log(8);
});

console.log(5);
