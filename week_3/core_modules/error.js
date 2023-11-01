const fs = require('fs');
// const add = (a, b) => {
//   if (typeof a !== 'number' || typeof b !== 'number') {
//     return new Error('Invalid input');
//   }
//   return a + b;
// };

// // console.log(add(1, 2)) // 3
// console.log(add('1', 2)); // Error: Invalid input

// const readFile = (path) => {
//     try {
//         const data = fs.readFileSync(path, 'utf8');
//         return data;
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// console.log(readFile('./error.js'));

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }

  static unknownError() {
    return new CustomError(this.message || 'Unknown error', 500);
  }
}

const readFile = (path) => {
    try {
        const data = fs.readSync(path, 'utf8');
        return data;
    } catch (error) {
        return CustomError.unknownError()
        
    }
}

console.log(readFile('./err.js'));