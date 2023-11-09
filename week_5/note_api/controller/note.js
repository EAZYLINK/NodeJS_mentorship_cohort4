import {v4 as uuidv4} from 'uuid'
import fs from 'fs'
import { get } from 'http'

export const createNote = (req, res) => {
    const {userid, title, description} = req.body
    if (!userid || !title || !description) {
        res.status(400).json({
            success: false,
            message: 'All input fields are required!'
        })
        return
    }
    try {
        const accounts = fs.readFileSync('./data/accounts.json')
        const parsedAccounts = JSON.parse(accounts)
        const findAccount = parsedAccounts.find(account => account.userid === userid)
        if (!findAccount) {
            res.status(400).json({
                success: false,
                message: 'User not found!'
            })
            return
        }
        const notes = fs.readFileSync('./data/notes.json')
        const parsedNotes = JSON.parse(notes)
        const note = {
            noteid: uuidv4(),
            userid,
            title,
            description,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        parsedNotes.push(note)
        fs.writeFileSync('./data/notes.json', JSON.stringify(parsedNotes, null, 2))
        res.status(201).json({
            success: true,
            message: 'Note created successfully!',
            data: note
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
    }

export const getAllNotes = (req, res) => {
    try {
        const notes = fs.readFileSync('./data/notes.json')
        const parsedNotes = JSON.parse(notes)
        res.status(200).json({
            success: true,
            message: 'Notes retrieved successfully!',
            data: parsedNotes
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// export const getNoteById = (req, res) => {
//     const {noteid} = req.params
//     if (!noteid) {
//         res.status(400).json({
//             success: false,
//             message: 'Note ID is required'
//         })
//         return
//     }
//     try {
//         const notes = fs.readFileSync('./data/notes.json')
//         const parsedNotes = JSON.parse(notes)
//         const findNote = parsedNotes.find(note => note.noteid === noteid)
//         if (!findNote) {
//             res.status(400).json({
//                 success: false,
//                 message: 'Note with supplied ID not found'
//             })
//             return
//         }
//         res.status(200).json({
//             success: true,
//             message: 'Note retrieved successfully!',
//             data: findNote
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// export const getNoteByUserId = (req, res) => {
//     const {userid} = req.params
//     if (!userid) {
//         res.status(400).json({
//             success: false,
//             message: 'User ID is required'
//         })
//         return
//     }
//     try {
//         const notes = fs.readFileSync('./data/notes.json')
//         const parsedNotes = JSON.parse(notes)
//         const findNotes = parsedNotes.filter(note => note.userid === userid)
//         if (!findNotes) {
//             res.status(400).json({
//                 success: false,
//                 message: 'Note with supplied userID not found'
//             })
//             return
//         }
//         res.status(200).json({
//             success: true,
//             message: 'Note retrieved successfully!',
//             data: findNotes
//         })
//     } catch (error) {
//         res.status(500).json({Error: error.message})
//     }
// }

export const getNoteById = (req, res) => {
    const {id} = req.params
    if (!id) {
        res.status(400).json({
            success: false,
            message: 'Note ID is required'
        })
        return
    }
    try {
        const notes = fs.readFileSync('./data/notes.json')
        const parsedNotes = JSON.parse(notes)
        const findNote = parsedNotes.filter(note => (note.noteid === id || note.userid === id))
        if (!findNote) {
            res.status(400).json({
                success: false,
                message: 'Note with supplied ID not found'
            })
            return
        }
        res.status(200).json({
            success: true,
            message: 'Note retrieved successfully!',
            data: findNote
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateNote = (req, res) => {
    const {userid, noteid} = req.params
    if (!userid || !noteid) {
        res.status(400).json({
            success: false,
            message: 'User ID and Note ID are required'
        })
        return
    }
    try {
        const accounts = fs.readFileSync('./data/accounts.json')
        const parsedAccounts = JSON.parse(accounts)
        const findAccount = parsedAccounts.find(account => account.userid === userid)
        if (!findAccount) {
            res.status(400).json({
                success: false,
                message: 'User not found!'
            })
            return
        }
        const notes = fs.readFileSync('./data/notes.json')
        const parsedNotes = JSON.parse(notes)
        let findNote = parsedNotes.find(note => note.noteid === noteid)
        if (!findNote) {
            res.status(400).json({
                success: false,
                message: 'Note not found!'
            })
            return
        }
        findNote = {
            ...findNote,
            ...req.body,
            updatedAt: new Date().toISOString()
        }
        const filteredNotes = parsedNotes.filter(note => note.noteid !== noteid)
        filteredNotes.push(findNote)
        fs.writeFileSync('./data/notes.json', JSON.stringify(filteredNotes, null, 2))
        res.status(200).json({
            success: true,
            message: 'Note updated successfully!',
            data: findNote
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteNote = (req, res) => {
    const {id} = req.params
    if (!id) {
        res.status(400).json({
            success: false,
            message: 'Note ID or userId is required'
        })
        return
    }
    try {
        const notes = fs.readFileSync('./data/notes.json')
        const parsedNotes = JSON.parse(notes)
        const findNote = parsedNotes.find(note => (note.noteid === id || note.userid === id))
        if (!findNote) {
            res.status(400).json({
                success: false,
                message: 'Note not found!'
            })
            return
        }
        const filteredNotes = parsedNotes.filter(note => (note.noteid !== id && note.userid !== id))
        fs.writeFileSync('./data/notes.json', JSON.stringify(filteredNotes, null, 2))
        res.status(200).json({
            success: true,
            message: 'Note deleted successfully!',
            data: filteredNotes
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}