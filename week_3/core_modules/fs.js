const fs = require('fs');

// fs.mkdir('fileDir', (err) => {
//     if (err) {
//         console.log(err.message)
//     }
//     console.log('Directory created successfully')
// })

// fs.writeFile('fileDir/hello.html', '<h1>Hello, Techahonian!</h1>', (err) => {
//     if (err) {
//         console.log(err.message)
//     }
//     console.log('File created successfully')
// })

// fs.writeFile('fileDir/hello.html', '<h1>Welcome, Techahonian!</h1>', (err) => {
//     if (err) {
//         console.log(err.message)
//     }
//     console.log('File created successfully')
// })

// fs.appendFile('fileDir/hello.html', '<p>We are having a class</p>', (err) => {
//     if (err) {
//         console.log(err.message)
//     }
//     console.log('File created successfully')
// })

//  fs.readFile('fileDir/hello.html', 'utf8', (err, data) => {
//     if (err) {
//         console.log(err.message)
//     }
//     console.log(data)
// });

// (a, b) => a + b

// const data = fs.writeFileSync('fileDir/hello.html', '<h1>Hello, Techahonian!</h1>');

// if (!data) {
//     console.log('an error occured')
// }

// fs.rename('fileDir/hello.html', 'fileDir/welcome.html', (err) => {
//     if (err) {
//         console.log(err.message)
//     }
//     console.log('File renamed successfully')
// })

// fs.exists('fileDir/welcome.html', (exists) => {
//     if (exists) {
//         console.log('File exists')
//     } else {
//         console.log('File does not exist')
//     }
// })

// fs.unlink('fileDir/welcome.html', (err) => {
//     if (err) {
//         console.log(err.message)
//     }
//     console.log('File deleted successfully')
// })