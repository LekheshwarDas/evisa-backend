import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    formId: {
        type: String,
        required: true,
    },
    response : {
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
    paidTime: {
        type: Date,
        default: Date.now,
    },
    appliedTime: {
        type: Date,
        default: Date.now,
    }
});

const Payments = mongoose.model("payment", PaymentSchema);
export { Payments };

