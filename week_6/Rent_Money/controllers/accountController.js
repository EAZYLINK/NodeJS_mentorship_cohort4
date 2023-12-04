import {
    createAccountService, 
    hashPasswordService, 
    emailExistsService, 
    usernameExistsService, 
    getAccountsService, 
    getAccountByIdService,
    updateAccountService,
    deleteAccountService
} from '../services/accountService.js';
import APIError from '../utils/APIError.js';

export const createAccountController = async (req, res, next) => {
    const {firstName, lastName, email, username, password, address, phone} = req.body;
    if (!firstName || !lastName || !email || !username || !password || !address || !phone) {
        return next(APIError.badRequest('Missing required fields!'));
    }
    try {
        const emailExist = await emailExistsService(email);
        if (emailExist) {
            return next(APIError.badRequest('Email already exists!'));
        }
        const usernameExist = await usernameExistsService(username);
        if (usernameExist) {
            return next(APIError.badRequest('Username already exists!'));
        }
        const hashedPassword = await hashPasswordService(password);
        req.body.password = hashedPassword;
        const newAccount = await createAccountService(req.body)
        res.status(201).json({
            success: true,
            message: 'Account created successfully!',
            data: newAccount
        })

    } catch (error) {
        next(APIError.customeError(error.message))
    }
}

export const getAccountController = async (req, res, next) => {
    try {
        const account = await getAccountsService();
        res.status(200).json({
            success: true,
            message: 'Account fetched successfully!',
            data: account
        })
    } catch (error) {
        next(APIError.customeError(error.message))
    }
}

export const getAccountByIdController = async (req, res, next) => {
    const {id} = req.params;
    if (!id) {
        return next(APIError.badRequest('Please supply account ID as params!'));
    }
    try {
        const account = await getAccountByIdService(id);
        if (!account) {
            return next(APIError.notFound('Account not found!'));
        }
        res.status(200).json({
            success: true,
            message: 'Account fetched successfully!',
            data: account
        })
    } catch (error) {
        next(APIError.customeError(error.message))
    }
}

export const updateAccountController = async (req, res, next) => {
    const {id} = req.params;
    if (!id) {
        return next(APIError.badRequest('Please supply account ID as params!'));
    }
    try {
        const findAccount = await getAccountByIdService(id);
        if (!findAccount) {
            return next(APIError.notFound('Account not found!'));
        }
        if (Object.keys(req.body).length === 0) {
            return next(APIError.badRequest('Please supply update data!'));
        }
        const updatedAccount = await updateAccountService(id, req.body);
        res.status(200).json({
            success: true,
            message: 'Account updated successfully!',
            data: updatedAccount
        })
    } catch (error) {
        next(APIError.customeError(error.message))
        
    }
}

export const deleteAccountController = async (req, res, next) => {
    const {id} = req.params;
    if (!id) {
        return next(APIError.badRequest('Please supply account ID as params!'));
    }
    try {
        const findAccount = await getAccountByIdService(id);
        if (!findAccount) {
            return next(APIError.notFound('Account not found!'));
        }
        const deletedAccount = await deleteAccountService(id);
        res.status(200).json({
            success: true,
            message: 'Account deleted successfully!',
            data: deletedAccount
        })
    } catch (error) {
        next(APIError.customeError(error.message))
        
    }
}

