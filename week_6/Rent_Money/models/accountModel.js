import { Schema, model } from "mongoose";

const accountSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    LastName: {
    type: String,
    required: true
    },
    email: {
    type: String,
    required: true,
    email: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
    type: String,
    required: true,
    }
}, { timestamps: true });

export const AccountModel = model('Account', accountSchema);