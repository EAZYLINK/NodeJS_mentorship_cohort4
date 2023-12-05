import express from 'express';
import { 
    createAccountController, 
    getAccountByIdController, 
    getAccountController,
    updateAccountController,
    deleteAccountController
 } from '../controllers/accountController.js';
 import { isLoggenInController, isAdminController } from '../middleware/auth.js';

export const accountRouter = express.Router();

accountRouter.post('/create', createAccountController);
accountRouter.get('/', isLoggenInController, isAdminController, getAccountController);
accountRouter.route('/:id').get(isLoggenInController, getAccountByIdController)
                            .put(isLoggenInController, updateAccountController)
                            .delete(isLoggenInController, deleteAccountController)