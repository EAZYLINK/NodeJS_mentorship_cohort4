const http = require('http')
const { createAccount } = require('./account')


const server = http.createServer((req, res) => {
    const { url, method } = req

    switch(method) {
        case 'GET':
            switch(url) {
                case '/':
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.write(JSON.stringify({ message: 'Welcome to our Note API!' }))
                    res.end()
                    break
                case '/notes':
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.write(JSON.stringify({ message: 'Getting notes' }))
                    res.end()
                    break
                case '/accounts':
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.write(JSON.stringify({ message: 'Getting accounts' }))
                    res.end()
                    break
            }
            break
        case 'POST':
            switch(url) {
                case '/notes':
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.write(JSON.stringify({ message: 'Creating notes' }))
                    res.end()
                    break
                case '/accounts':
                    createAccount(req, res)
                    break
            }
            break
            default:
                res.end('Route not found')
    }
})

const PORT = 8000

server.listen(PORT, () => console.log(`Server is runnning on http://localhost:${PORT}`))