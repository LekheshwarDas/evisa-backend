import mongoose from "mongoose";
const Schema = mongoose.Schema;

const personalSchema = new Schema({
  formId: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' }
});

const addressSchema = new Schema({
  addressline1: { type: String, required: true },
  addressline2: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String,  default: '000000'}
});

const passportSchema = new Schema({
  passport: { type: String, required: true },
  issuance: { type: String, required: true },
  issue: { type: Date, required: true },
  expiration: { type: Date, required: true }
})

const travelSchema = new Schema({
  purpose: { type: String, required: true },
  appliedCountry: { type: String, required: true },
  stay: { type: String, required: true },
  departure: { type: Date, required: true },
  arrival: { type: Date, required: true }
})

const filesSchema = new Schema({
  photo: {
    data: Buffer,
    contentType : String
  },
  signature: {
    data: Buffer,
    contentType : String
  },
  passportFile: {
    data: Buffer,
    contentType : String
  },
  financial: {
    data: Buffer,
    contentType : String
  }
})

const formSchema = new Schema({
  status: {
    type: String,
    enum: ['waiting', 'processing', 'approved'],
    default: 'waiting'
  },
  appliedTime: { type: Date, default: Date.now }
})

const applicantSchema = new Schema({
  userId: { type: String, required: true },
  personalInfo: personalSchema,
  permanentAddress: addressSchema,
  currentAddress: addressSchema,
  passportInfo: passportSchema,
  travelInfo: travelSchema,
  filesInfo: filesSchema,
  formInfo: formSchema,
});

const Applicant = mongoose.model('applicant', applicantSchema);
export { Applicant };




























// const VisaSchema = new mongoose.Schema({
//     userId: {
//         type: String,
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     firstname: {
//         type: String,
//         required: true
//     },
//     lastname: {
//         type: String,
//         required: true
//     },
//     fatherName: {
//         type: String,
//         required: true
//     },
//     motherName: {
//         type: String,
//         required: true
//     },
//     addressLine1: {
//         type: String,
//         required: true
//     },
//     addressLine2: {
//         type: String,
//         required: true
//     },
//
//     phone: {
//         type: String,
//         required: true
//     },
//     dateOfBirth: {
//         type: Date,
//         default: Date.now
//     },
//     country: {
//         type: String,
//         required: true
//     },
//     state: {
//         type: String,
//         required: true
//     },
//     city: {
//         type: String,
//         required: true
//     },
//     pincode: {
//         type: String,
//         required: true
//     },
//     profilePhoto: {
//         data: Buffer,
//         contentType: String,
//     },
//     sign: {
//         data: Buffer,
//         contentType: String,
//     },
//     passport: {
//         data: Buffer,
//         contentType: String,
//     },
//     travel: {
//         data: Buffer,
//         contentType: String,
//     },
//     accom: {
//         data: Buffer,
//         contentType: String,
//     },
//     financial: {
//         data: Buffer,
//         contentType: String,
//     },
//     health: {
//         data: Buffer,
//         contentType: String,
//     },
//     insurance: {
//         data: Buffer,
//         contentType: String,
//     }
// });