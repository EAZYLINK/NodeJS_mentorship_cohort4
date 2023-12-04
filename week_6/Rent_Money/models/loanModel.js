import { Schema, model } from "mongoose";

const loanSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    ammount: {
        type: Number,
        required: true
    },
    interest: {
        type: Number,
        required: true
    },
    term: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'disbursed'],
        default: 'pending'
    }
}, { timestamps: true });

export const LedgerModel = model('Loan', loanSchema);