const http = require('http')
const { creatAccount, getAllAccounts, editAccount, getAcountByUsername, deleteAccount } = require('./account')

const PORT = 8000
const server = http.createServer((req, res) => {
    const { method, url, headers } = req
    const parsedUrl = new URL(url, `http://${headers.host}`)
    const path = parsedUrl.pathname
    const params = parsedUrl.searchParams
    console.log(path)
    switch (method) {
        case 'GET':
            switch (path) {
                case '/':
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.write(JSON.stringify({
                        success: true,
                        message: 'Welcome to our Note API'
                    }))
                    res.end()
                    break
                case '/accounts':
                    if (params.get('username')) {
                        getAllAccounts(req, res)
                        return
                    }
                    getAcountByUsername(req, res, params.get('username'))
                    break
                case '/notes':
                    res.end('Getting Notes')
                    break
                default:
                    res.writeHead(404, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({
                        success: false,
                        message: 'Route not found'
                    }))
            }
            break
        case 'POST':
            switch (url) {
                case '/note':
                    res.end('Create Note')
                    break
                case '/accounts':
                    creatAccount(req, res)
                    break
                default:
                    res.writeHead(404, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({
                        success: false,
                        message: 'Route not found'
                    }))
            }
            break
        case 'PUT':
            switch (url) {
                case '/note':
                    res.end('Edit Note')
                    break
                case '/accounts':
                    editAccount(req, res)
                    break
                default:
                    res.writeHead(404, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({
                        success: false,
                        message: 'Route not found'
                    }))
            }
            break
        case 'DELETE':
            switch (path) {
                case '/note':
                    res.end('Delete Note')
                    break
                case '/accounts':
                    deleteAccount(req, res, params.get('username'))
                    break
                default:
                    res.writeHead(404, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({
                        success: false,
                        message: 'Route not found'
                    }))
            }
            break
        default:
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'Route not found'
            }))
    }
    })


server.listen(PORT, ()=> {
    console.log(`Server running at: http://localhost:${PORT}/`)
})