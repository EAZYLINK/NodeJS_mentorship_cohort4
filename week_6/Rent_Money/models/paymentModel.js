import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
    loan: {
        type: Schema.Types.ObjectId,
        ref: 'Loan',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    princicipal: {
        type: Number,
        required: true
    },
    interest: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export const PaymentModel = model('Payment', paymentSchema);