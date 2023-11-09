import express from 'express'
import { createAccount, getAccountByUserId, updateAccount, deleteAccount, getAllAccounts } from '../controller/account.js'

export const accountRoutes = express.Router()

accountRoutes.route('/').post(createAccount).get(getAllAccounts)
accountRoutes.route('/:userid').get(getAccountByUserId).put(updateAccount).delete(deleteAccount)