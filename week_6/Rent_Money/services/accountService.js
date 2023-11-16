import { Account } from '../models/account.js';

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
    const updatedAccount = Account.findByIdAndUpdate(id, body)
    return updatedAccount;
}

export const deleteAccountService = async(id) => {
    const deletedAccount = Account.findByIdAndDelete(id);
    return deletedAccount;
}