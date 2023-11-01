// function greet(name) {
//     console.log('Hello ' + name);
// }

// greet('James')

// function add(a, b) {
//     return a + b
// }

// let sum = add(5, 6)
// console.log(sum)

// function diff(a, b) {
//     return a - b
// }

// function diff(a, b) {
//     let difference = 0
//     a -b >= 0 ? difference = a - b : difference = b - a
//     return difference
// }

// let difference = diff(5, 10)
// console.log(difference)

function add([...b]){
    let sum = 0
    for(let i = 0; i < b.length; i++){
        sum += b[i]
    }
    return sum
}

let sum = add([1, 2, 3, 4, 5])
console.log(sum)