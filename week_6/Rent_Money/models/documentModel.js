import { Schema, model } from "mongoose";

const documentSchema = new Schema({
    loan: {
        type: Schema.Types.ObjectId,
        ref: 'Loan',
        required: true
    },
    documentType: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const DocumentModel = model('Document', documentSchema);