import express from 'express';
import { 
    createAccountController, 
    getAccountByIdController, 
    getAccountController,
    updateAccountController,
    deleteAccountController
 } from '../controllers/accountController.js';

export const accountRouter = express.Router();

accountRouter.post('/create', createAccountController);
accountRouter.get('/get', getAccountController);
accountRouter.get('/get/:id', getAccountByIdController);
accountRouter.put('/update/:id', updateAccountController);
accountRouter.delete('/delete/:id', deleteAccountController);