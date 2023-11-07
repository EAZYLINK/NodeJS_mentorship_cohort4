import express from 'express'
import { createAccount, getAccountByUserId } from '../controller/account.js'

export const accountRoutes = express.Router()

accountRoutes.post('/', createAccount)
accountRoutes.get('/:userid', getAccountByUserId)