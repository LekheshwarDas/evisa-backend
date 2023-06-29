import express from 'express';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();
import { Applicant } from "../Models/VisaApplication.js";
import { UserModel } from '../Models/User.js';
import { RenewalModel } from '../Models/VisaRenewal.js';

// handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// handle file submission
router.post('/addApplicant', upload.fields([
  { name: 'passportFile', maxCount: 1 },
  { name: 'photo', maxCount: 1 },
  { name: 'financial', maxCount: 1 },
  { name: 'signature', maxCount: 1 }
]), async (req, res) => {
  
  const formId = 'EVS' + Math.floor(Math.random() * 1000000).toString().padStart(8, '0');

  const { currentaddressLine1, currentaddressLine2, currentpincode, currentcity, currentstate, currentcountry, permanentaddressLine1, permanentaddressLine2, permanentpincode, permanentcity, permanentstate, permanentcountry, firstname, lastname, fatherName, motherName, gender, dateOfBirth, phone, email, passport, issue, expiration, issuance, purpose, appliedCountry, stay, departure, arrival, status, appliedTime } = req.body;
  
  const user = await UserModel.findOne({ email});
  const userId = user.userId;
  console.log(userId);
  const applicant = await Applicant.findOne({ userId });
  
  if (applicant) {
    return res.json({ message: "User applied already with mentioned details" });
  }
  const newApplicant = new Applicant({
    userId: user.userId,
    personalInfo: {
      formId,
      firstname: firstname,
      lastname: lastname,
      fatherName: fatherName,
      motherName: motherName,
      email: email,
      phone: phone,
      dateOfBirth: dateOfBirth,
      gender: gender,
    },
    permanentAddress: {
      addressline1: permanentaddressLine1,
      addressline2: permanentaddressLine2,
      country: permanentcountry,
      city: permanentcity,
      state: permanentstate,
      pincode: permanentpincode,
    },
    currentAddress: {
      addressline1: currentaddressLine1,
      addressline2: currentaddressLine2,
      country: currentcountry,
      city: currentcity,
      state: currentstate,
      pincode: currentpincode,
    },
    passportInfo: {
      passport: passport,
      issuance: issuance,
      issue: issue,
      expiration: expiration,
    },
    travelInfo: {
      purpose: purpose,
      appliedCountry: appliedCountry,
      stay: stay,
      departure: departure,
      arrival: arrival,
    },
    filesInfo: {
      photo: {
        data: fs.readFileSync('uploads/' + req.files.photo[0].filename),
        contentType: req.files.photo[0].mimetype
      },
      signature: {
        data: fs.readFileSync('uploads/' + req.files.signature[0].filename),
        contentType: req.files.signature[0].mimetype
      },
      passportFile: {
        data: fs.readFileSync('uploads/' + req.files.passportFile[0].filename),
        contentType: req.files.passportFile[0].mimetype
      },
      financial: {
        data: fs.readFileSync('uploads/' + req.files.financial[0].filename),
        contentType: req.files.financial[0].mimetype
      }
    },
    formInfo: {
      status,
      appliedTime,
    }
  })

  await newApplicant.save();
  res.json({ message: "Application submitted successfully, Click OK to proceed payment" });
})

router.get('/ack/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await Applicant.findOne({ userId });
    if (!user) {
      return res.status(404).send('User not found');
    }else{
      res.json(user);
    }
  
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
})

router.get('/files/:userId', async(req, res) => {
  const userId = req.params.userId;
  try {
    const user = await Applicant.findOne({ userId });
    if (!user) {
      return res.status(404).send('User not found');
    }else{
      const files = user.filesInfo;
      res.json(files);
    }
  
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
})

router.get('/visaApplications', (req, res) => {
  Applicant.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});


router.get('/application-count', async (req, res) => {
  try {
    const count = await Applicant.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/reject/:formId', async(req,res)=>{
  const applicant = await Applicant.findOne({ formId: req.params.formId });
  try {
      await applicant.remove();
      res.json({ message: "Application rejected"});
  } catch (error) {
      res.json(error);
  }
})

router.post('/rejectRenewal/:userId', async(req,res)=>{
  const applicant = await RenewalModel.findOne({ userId: req.params.userId });
  try {
      await applicant.remove();
      res.json({ message: "Renewal rejected"});
  } catch (error) {
      res.json(error);
  }
})

router.post('/renewal', async (req, res) => {
  try {
    const { visaNo, userId, fullName, passportNumber, expiryDate, country, response, amount, currency } = req.body;
    const newRenewal = new RenewalModel({ visaNo, userId, fullName, passportNumber, expiryDate, country, response, amount, currency });
    await newRenewal.save();
    res.json({ message: 'User applied successfully', newRenewal });
  } catch (err) {
    res.json({ error: err.message });
  }
})

router.get('/renewal', (req,res) => {
  RenewalModel.find({}, (err, result) => {
    if (err) {
        res.json(err);
    } else {
        res.json(result);
    }
});
})

router.get('/renewal-count', async (req, res) => {
  try {
    const count = await RenewalModel.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

export { router as applicantRouter };