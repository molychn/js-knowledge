const argv = process.argv;
// node process.js
// 输出的前两项分别为node的配置路径，process.js文件的路径
console.log(argv);
// 因此大部分获取命令行参数需要从第2位开始获取
console.log(argv.slice(2));