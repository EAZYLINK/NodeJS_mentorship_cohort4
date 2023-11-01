const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('greet', () =>{
    console.log('Hello, Techahonian!')
})

eventEmitter.on('add', (a, b) => {
    console.log(a + b)
})

// eventEmitter.emit('greet')

eventEmitter.emit('add', 1, 2)