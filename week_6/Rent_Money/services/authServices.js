import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const secret = process.env.JWT_SECRET;

export const generateToken = (payload) => {
    const token = jwt.sign(payload, secret);
    return token;
}

export const verifyToken = (token) => {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
}

export const isValidPassword = (password, hashedPassword) => {
    const validPassword = bcrypt.compare(password, hashedPassword);
    return validPassword;
}

export const isAdminService = (role) => {
    if (role === 'admin') {
        return true;
    }
    return false;
}

export const isBorrowerService = (role) => {
    if (role === 'borrower') {
        return true;
    }
    return false;
}

export const isLenderService = (role) => {
    if (role === 'lender') {
        return true;
    }
    return false;
}
