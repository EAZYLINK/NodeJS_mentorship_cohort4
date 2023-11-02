const fs = require('fs')

exports.creatAccount = (req, res) => {
    try {
        let data = ''
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', () => {
            if (!data) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                    success: false,
                    message: 'Please provide data'
                }))
                return
            }
            const account = JSON.parse(data)
            const {firstName, lastName, username, password} = account
           if (!firstName || !lastName || !username || !password) {
               res.writeHead(400, { 'Content-Type': 'application/json' })
               res.end(JSON.stringify({
                   success: false,
                   message: 'Please provide all missing fields'
               }))
               return
           }
           const oldAccounts = fs.readFileSync('./accounts.json', 'utf-8')
           const parsedAccounts = JSON.parse(oldAccounts)
           const usernameExists = parsedAccounts.find(account => account.username === username)
           if (usernameExists) {
                res.writeHead(409, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                     success: false,
                     message: 'Username already exists'
                }))
                return
              }
           parsedAccounts.push(account)
           fs.writeFileSync('./accounts.json', JSON.stringify(parsedAccounts))
           res.writeHead(201, { 'Content-Type': 'application/json' })
             res.end(JSON.stringify({
                  success: true,
                  data: account
             }))
        })
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            success: false,
            message: 'Error, writing to file',
            Error: error.message
        }))
    }
}

exports.getAllAccounts = (req, res) => {
    try {
        const accounts = fs.readFileSync('./accounts.json', 'utf-8')
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            success: true,
            message: 'Accounts retrieved successfully',
            data: JSON.parse(accounts)
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

exports.getAcountByUsername = (req, res, username) => {
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
        const findAccount = parsedAccounts.find(account => account.username === username)
        if (!findAccount) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'Account not found'
            }))
            return
        }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            success: true,
            message: 'Account retrieved successfully',
            data: findAccount
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

exports.editAccount = (req, res) => {
    let data = ''
    req.on('data', chunk => {
        data += chunk
    })
    req.on('end', () =>{
        const account = JSON.parse(data)
        const {username} = account
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
        const findAccount = parsedAccounts.find(account => account.username === username)
        if (!findAccount) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'Account not found'
            }))
            return
        }
        const updateAccount = {...findAccount, ...account}
        console.log(updateAccount)
        const filterAccounts = parsedAccounts.filter(account => account.username !== username)
        filterAccounts.push(updateAccount)
        fs.writeFileSync('./accounts.json', JSON.stringify(filterAccounts))
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            success: true,
            message: 'Account updated successfully',
            data: updateAccount
        }))
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            success: false,
            message: 'Error, reading file',
            Error: error.message
        }))
        
    }
    })
}

exports.deleteAccount = (req, res, username) => {
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
        const findAccount = parsedAccounts.find(account => account.username === username)
        if (!findAccount) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                success: false,
                message: 'Account not found'
            }))
            return
        }
        const filterAccounts = parsedAccounts.filter(account => account.username !== username)
        fs.writeFileSync('./accounts.json', JSON.stringify(filterAccounts))
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            success: true,
            message: 'Account deleted successfully',
            data: findAccount
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
