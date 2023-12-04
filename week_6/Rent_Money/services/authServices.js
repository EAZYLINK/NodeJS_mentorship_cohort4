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
