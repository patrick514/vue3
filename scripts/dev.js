// 这个文件会帮我们打包 packages下的模块， 最终打包出js文件


import minimist from "minimist";

const args = minimist(process.argv.slice(2))

console.log(args)