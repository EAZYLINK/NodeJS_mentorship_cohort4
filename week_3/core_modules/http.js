const http = require('http')

const server = http.createServer((req, res)=>{
    // res.end('Hello, Techathonians!')

    // res.writeHead(200, {'Content-Type': 'text/html'})
    // res.write('<h1>Hello, Techathonians!</h1>')
    
    const fruits = {
        apple: 10,
        orange: 20,
        banana: 30
    }

    const url = req.url
    const method = req.method
    const statusCode = res.statusCode
    switch(url){
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write('<h1>Home Page</h1>')
            break
        case '/register':
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write('<h1>Register Page</h1>')
            break
        case '/fruits':
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(JSON.stringify(fruits))
            console.log('method: ', method)
            console.log('statusCode: ', statusCode)
            res.end()
            break
        default:
            res.writeHead(404, {'Content-Type': 'text/html'})
            res.write('<h1>Page Not Found</h1>')
    }
})



server.listen(5000, ()=>{
    console.log('Server is listening on port 5000...')
})