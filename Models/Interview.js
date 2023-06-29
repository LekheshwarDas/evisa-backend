import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema({
   formId: { type: String, required: true },
   name: { type: String, required: true },
   appliedCountry: { type: String, required: true },
   interviewTime: { type: Date},
   interviewVenue: { 
      type: String,
      default: 'Not Scheduled'
   },
   processTime: { type: Date, default: Date.now },
   status: {
      type: String,
      enum: ['Not Scheduled', 'Interview Scheduled', 'Interview Completed'],
      default: 'Not Scheduled'
   }
});

const Interview = mongoose.model("interview", InterviewSchema);
export { Interview };
