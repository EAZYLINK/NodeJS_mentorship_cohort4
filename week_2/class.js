// class Car {
//     constructor(brand) {
//         this.carname = brand;
//     }
//     present() {
//         return 'I have a ' + this.carname;
//     }
// }



// class Engine extends Car {
//     constructor(brand, engine) {
//         super(brand);
//         this.engine = engine
//     }
//     show() {
//         return this.present() + ', it has a ' + this.engine + ' engine';
//     }
// }

// let myCar = new Engine('Lexus', 'V8')

// console.log(myCar.show())

class Arith_operator {
    constructor(a, b) {
        this.a =a
        this.b = b
    }
    add() {
        return this.a + this.b
    }
    sub() {
        return this.a - this.b
    }
    diff() {
        let difference = 0
        this.a - this.b >= 0 ? difference = this.a - this.b : difference = this.b - this.a
        return difference
    }
    mult() {
        return this.a * this.b
    }
    div() {
        return this.a / this.b
    }
    remainder() {
        return this.a % this.b
    }
}

let myArith = new Arith_operator(5, 10)

console.log(myArith.diff())