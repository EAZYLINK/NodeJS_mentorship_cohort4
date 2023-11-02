const http = require('http')
const { creatAccount, getAllAccounts, editAccount, getAcountByUsername, deleteAccount } = require('./account')
const { createNote, getAllNotes, getNotesByUsername, getNotesByTitle, editNote, deleteNoteByTitle, deleteNoteByUsername} = require('./note')

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
                    if (!params) {
                        getAllNotes(req, res)
                        return
                    } else if(params.get('username')) {
                        getNotesByUsername(req, res, params.get('username'))
                    } else if(params.get('title')) {
                        getNotesByTitle(req, res, params.get('title'))
                    }
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
                case '/notes':
                    createNote(req, res)
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
                case '/notes':
                    editNote(req, res)
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
                case '/notes':
                    if (params.get('username')) {
                        deleteNoteByUsername(req, res, params.get('username'))
                        return
                    }
                    deleteNoteByTitle(req, res, params.get('title'))
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