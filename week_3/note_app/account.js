const fs = require('fs');

exports.createAccount = (req, res) => {
    let data = ''
    req.on('data', chunk => {
        data += chunk
    })
    req.on('end', () => {
        note = JSON.parse(data)
        const {firstName, lastName, username, password} = note
        if (!firstName || !lastName || !username || !password) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'Please provide all fields'
            }))
            return
        }
        try {
            fs.writeFileSync('./accounts.json', JSON.stringify(note))
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: true,
                message: 'Account created successfully',
                data: note
            }))
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'An error occured while creating account',
                error: error.message
            }))
        }
    })
}