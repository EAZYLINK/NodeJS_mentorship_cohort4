const fs = require('fs')

exports.createNote = (req, res) => {
    let data = ''
    req.on('data', chunk => {
        data += chunk
    })
    req.on('end', ()=> {
        if (!data) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'Please provide data'
            }))
            return
        }
        const note = JSON.parse(data)
        const {username, title, description} = note
        if (!username || !title || !description) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'Please provide username, title and description'
            }))
            return
        }
        try {
            const accounts = fs.readFileSync('./accounts.json', 'utf-8')
            const parsedAccounts = JSON.parse(accounts)
            const account = parsedAccounts.find(account => account.username === username)
            if (!account) {
                res.writeHead(401, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                    success: false,
                    message: 'invalid username'
                }))
                return
            }
            const notes = fs.readFileSync('./notes.json', 'utf-8')
            const parsedNotes = JSON.parse(notes)
            parsedNotes.push(note)
            fs.writeFileSync('./notes.json', JSON.stringify(parsedNotes))
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: true,
                message: 'Note created successfully',
                data: note
            }))
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'Error, writing file',
                Error: error.message
            }))
        }
    })
}

exports.getAllNotes = (req, res) => {
    try {
        const notes = fs.readFileSync('./notes.json', 'utf-8')
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            success: true,
            message: 'Notes retrieved successfully',
            data: JSON.parse(notes)
        }))
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            success: false,
            message: 'Error, reading file',
            Error: error.message
        }))
    }
}

exports.getNotesByUsername = (req, res, username) => {
    try {
        if (!username) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'Please provide username'
            }))
            return
        }
        const accounts = fs.readFileSync('./accounts.json', 'utf-8')
        const parsedAccounts = JSON.parse(accounts)
        const account = parsedAccounts.find(account => account.username === username)
        if (!account) {
            res.writeHead(401, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'invalid username'
            }))
            return
        }
        const notes = fs.readFileSync('./notes.json', 'utf-8')
        const parsedNotes = JSON.parse(notes)
        const findNotes = parsedNotes.filter(note => note.username === username)
        if (!findNotes) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'Notes not found'
            }))
            return
        }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            success: true,
            message: 'Notes retrieved successfully',
            data: findNotes
        }))
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            success: false,
            message: 'Error, reading file',
            Error: error.message
        }))
    }
}

exports.getNotesByTitle = (req, res, title) => {
    try {
        if (!title) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'Please provide title of note'
            }))
            return
        }
        const notes = fs.readFileSync('./notes.json', 'utf-8')
        const parsedNotes = JSON.parse(notes)
        const findNotes = parsedNotes.filter(note => note.title === title)
        if (!findNotes) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'Notes not found'
            }))
            return
        }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            success: true,
            message: 'Notes retrieved successfully',
            data: findNotes
        }))
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            success: false,
            message: 'Error, reading file',
            Error: error.message
        }))
    }
}

exports.editNote = (req, res) => {
    let data = ''
    req.on('data', chunk => {
        data += chunk
    })
    req.on('end', ()=> {
        if (!data) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'Please provide data'
            }))
            return
        }
        const note = JSON.parse(data)
        const {username, title, description} = note
        if (!username || !title || !description) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'Please provide username, title and description'
            }))
            return
        }
        try {
            const accounts = fs.readFileSync('./accounts.json', 'utf-8')
            const parsedAccounts = JSON.parse(accounts)
            const account = parsedAccounts.find(account => account.username === username)
            if (!account) {
                res.writeHead(401, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                    success: false,
                    message: 'invalid username'
                }))
                return
            }
            const notes = fs.readFileSync('./notes.json', 'utf-8')
            const parsedNotes = JSON.parse(notes)
            findNote = parsedNotes.find(note => note.title === title)
            if (!findNote) {
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                    success: false,
                    message: 'Note not found'
                }))
                return
            }
            const updateNote = {...findNote, ...note}
            const filterNotes = parsedNotes.filter(note => note.title !== title)
            filterNotes.push(updateNote)
            fs.writeFileSync('./notes.json', JSON.stringify(filterNotes))
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: true,
                message: 'Note updated successfully',
                data: updateNote
            }))
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'Error, writing file',
                Error: error.message
            }))
        }
})
}

exports.deleteNoteByUsername = (req, res, username) => {
    if (!username) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            success: false,
            message: 'Please provide username'
        }))
        return
    }
    try {
        const accounts = fs.readFileSync('./accounts.json', 'utf-8')
        const parsedAccounts = JSON.parse(accounts)
        const account = parsedAccounts.find(account => account.username === username)
        if (!account) {
            res.writeHead(401, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'invalid username'
            }))
            return
        }
        const notes = fs.readFileSync('./notes.json', 'utf-8')
        const parsedNotes = JSON.parse(notes)
        const findNotes = parsedNotes.filter(note => note.username !== username)
        if (!findNotes) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'Notes not found'
            }))
            return
        }
        fs.writeFileSync('./notes.json', JSON.stringify(findNotes))
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            success: true,
            message: 'Notes deleted successfully',
            data: findNotes
        }))
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            success: false,
            message: 'Error, reading file',
            Error: error.message
        }))
    }
}

exports.deleteNoteByTitle = (req, res, title) => {
    if (!title) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            success: false,
            message: 'Please provide title of note'
        }))
        return
    }
    try {
        const notes = fs.readFileSync('./notes.json', 'utf-8')
        const parsedNotes = JSON.parse(notes)
        const findNotes = parsedNotes.filter(note => note.title !== title)
        if (!findNotes) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'Notes not found'
            }))
            return
        }
        fs.writeFileSync('./notes.json', JSON.stringify(findNotes))
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            success: true,
            message: 'Notes deleted successfully',
            data: findNotes
        }))
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            success: false,
            message: 'Error, reading file',
            Error: error.message
        }))
    }
}

