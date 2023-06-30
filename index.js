import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from 'dotenv';

import { adminRouter } from "./Routes/admin.js";
import { hreRouter } from "./Routes/hre.js";
import { userRouter } from './Routes/user.js';
import { applicantRouter } from './Routes/visaApplication.js';
import bodyParser from 'body-parser';
import { payRouter } from './Routes/payments.js';
import { interviewRouter } from './Routes/interview.js';
import { visaRouter } from './Routes/visa.js';
import { contactRoute } from './Routes/contact.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

// routes
app.use('/auth', adminRouter);
app.use('/auth-hre', hreRouter);
app.use('/auth-user', userRouter);
app.use('/application', applicantRouter);
app.use('/api', payRouter);
app.use('/interview', interviewRouter);
app.use('/visa', visaRouter);
app.use('/contact', contactRoute);

//database connection
const mongodbUrl = process.env.MONGODB_URL;
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
)

const port =  process.env.PORT || 3001;

app.listen(port, () => {
  console.log("Server started");
})