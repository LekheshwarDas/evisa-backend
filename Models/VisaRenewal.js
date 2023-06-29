import mongoose from 'mongoose';

const VisaRenewalSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    visaNo: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['waiting', 'processing', 'approved'],
        default: 'waiting'
    },
    appliedtime: {
        type: Date,
        default: Date.now,
    },
    fullName: {
        type: String,
        required: true,
    },
    passportNumber: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    response: {
        type: Object,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
})

const RenewalModel = mongoose.model('renewal', VisaRenewalSchema);

export { RenewalModel }