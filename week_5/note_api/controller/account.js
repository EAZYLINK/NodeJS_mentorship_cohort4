import {v4 as uuidv4} from 'uuid'
import fs from 'fs'


export const createAccount = (req, res) => {
    const {firstName, lastName, username, password} = req.body
    if (!firstName || !lastName || !username || !password) {
        res.status(400).json({
            success: false,
            message: 'All input fields are required!'
        })
    }
try  {
        const accounts = fs.readFileSync('./data/accounts.json', 'utf8')
        const parsedAccounts = JSON.parse(accounts)
        const findAccount = parsedAccounts.find(account=>account.username === username)
        if (findAccount) {
            res.status(400).json({
                success: false,
                message: 'username already exists'
            })
            return
        }
        const newAccount = {
            userid: uuidv4(),
            firstName,
            lastName,
            username,
            password
        }
        parsedAccounts.push(newAccount)
        fs.writeFileSync('./data/accounts.json', JSON.stringify(parsedAccounts))
        res.status(201).json({
            success: true,
            message: 'account created successfully!',
            data: newAccount
        })
} catch (error) {
    res.status(500).json({Error: error.message})
}
}

export const getAccountByUserId = (req, res) => {
    const {userid} = req.params
    console.log(req.params)
    if (!userid) {
        res.status(400).json({
            success: false,
            message: 'User ID is required'
        })
        return
    }
    try {
        const accounts = fs.readFileSync('./data/accounts.json', 'utf8')
        const parsedAccounts = JSON.parse(accounts)
        const findAccount = parsedAccounts.find(account=>account.userid === userid)
        if (!findAccount) {
            res.status(400).json({
                success: false,
                message: 'Account with supplied userID not found'
            })
            return
        }
        res.status(200).json({
            success: true,
            message: 'Account retrieved successfully!',
            account: findAccount
        })
    } catch (error) {
        res.status(500).json({Error: error.message})
    }
}