import { Account } from '../models/accountModel.js';
import bcrypt from 'bcryptjs';

export const createAccountService = async(body) => {
    const account = await Account.create(body);
    return account;
}

export const getAccountsService = async() => {
    const accounts = await Account.find();
    return accounts;
}

export const getAccountByIdService = async(id) => {
    const account = await Account.findById(id);
    return account;
}

export const updateAccountService = async(id, body) => {
    const updatedAccount = Account.findByIdAndUpdate(id, body, {new: true})
    return updatedAccount;
}

export const deleteAccountService = async(id) => {
    const deletedAccount = Account.findByIdAndDelete(id);
    return deletedAccount;
}

export const hashPasswordService = async(password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export const emailExistsService = async(email) => {
    const emailExist = await Account.findOne({email});
    if (emailExist) {
        return true;
    }
    return false;
}

export const usernameExistsService = async(username) => {
    const usernameExist = await Account.findOne({username});
    if (usernameExist) {
        return true;
    }
    return false;
}

export const getAccountByUsernameService = async(username) => {
    const account = await Account.findOne({username});
    return account;
}