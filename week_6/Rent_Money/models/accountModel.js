import { Schema, model } from "mongoose";

const accountSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
    type: String,
    required: true
    },
    email: {
    type: String,
    required: true,
    email: true,
    unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
    type: String,
    required: true,
    },
    address: {
        type: String,
        required: true
    },
    phone: {
    type: String,
    required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
}, { timestamps: true });

export const Account = model('Account', accountSchema);