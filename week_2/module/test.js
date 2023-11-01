// const mul = require('./mul.js');
const { mul, add } = require('./mul.js');

console.log(mul(2, 3)); // 6



// how require modules
// 1. core modules  require('fs')
// 2. file modules  require('./mul.js')   // same directory as current file
// 3. file modules in different directory  require('../mul.js')  // parent directory
// 4. file mdules in root directory  require('/root/mul.js')  // root directory