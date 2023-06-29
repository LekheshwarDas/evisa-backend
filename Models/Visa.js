import mongoose from 'mongoose';

const VisaSchema = new mongoose.Schema({
    visaNo: { type: String, required: true },
    formId: { type: String, required: true },
    name: { type: String, required: true },
    appliedCountry: { type: String, required: true },
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    approvedBy: { type: String, required: true }
})

const ArrivalSchema = new mongoose.Schema({
    visaNo: { type: String, required: true },
    name: { type: String, required: true },
    tktNo: { type: String, required: true },
    flightNo: { type: String, required: true },
    from: { type: String, required: true },
    via: { type: String, required: true },
    to: { type: String, required: true },
    flightDate: { type: Date, required: true },
    flightTime: { type: String, required: true }
})

const DepartureSchema = new mongoose.Schema({
    visaNo : { type: String, required: true },
    name: { type: String, required: true },
    tktNo: { type: String, required: true },
    flightNo: { type: String, required: true },
    from: { type: String, required: true },
    via: { type: String, required: true },
    to: { type: String, required: true },
    flightDate: { type: Date, required: true },
    flightTime: { type: String, required: true }
})

const VisaModel = mongoose.model('visa', VisaSchema);
const ArrivalModel = mongoose.model('arrival', ArrivalSchema);
const DepartureModel = mongoose.model('departure', DepartureSchema);

export { VisaModel, ArrivalModel, DepartureModel};