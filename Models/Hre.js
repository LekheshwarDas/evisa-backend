import mongoose from "mongoose";

const OfficerSchema = new mongoose.Schema({
    hrId: {
        type: String,
    },
    email: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    firstname: {
        type: String,
        // required: true
    },
    lastname: {
        type: String,
        // required: true
    },
    fatherName: {
        type: String,
        // required: true
    },
    motherName: {
        type: String,
        // required: true
    },
    addressLine1: {
        type: String,
        // required: true
    },
    addressLine2: {
        type: String,
        // required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other'
    },
    phone: {
        type: String,
        // required: true
    },
    dateOfBirth: {
        type: Date,
        default: Date.now
    },
    country: {
        type: String,
        // required: true
    },
    state: {
        type: String,
        // required: true
    },
    city: {
        type: String,
        // required: true
    },
    pincode: {
        type: String,
        // required: true
    },
    profilePhoto: {
        data: Buffer,
        contentType: String,
    },
});

const OfficerModel = mongoose.model("hre", OfficerSchema)
export { OfficerModel };