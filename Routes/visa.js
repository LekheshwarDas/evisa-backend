import express from 'express';

const router = express.Router();

import { VisaModel, ArrivalModel, DepartureModel } from '../Models/Visa.js';
import { Applicant } from '../Models/VisaApplication.js';

router.post('/visaResult', async (req, res) => {
  const { formId, visaNo, name, appliedCountry, issueDate, expiryDate, approvedBy } = req.body;
  try {
    const applicant = await Applicant.findOne({ formId });
    applicant.formInfo.status = 'approved';
    await applicant.save();
    const user = await VisaModel.findOne({ formId });
    if (user) {
      user.expiryDate = expiryDate;
      await user.save();
      res.json({ message: 'Visa details updated successfully' });
    } else {
      const newVisa = new VisaModel({ formId, visaNo, name, appliedCountry, issueDate, expiryDate, approvedBy });
      await newVisa.save();
      res.json({ message: "Visa Approved Successfully" });
    }
  } catch (error) {
    res.json(error);
  }
})

router.get('/approvedVisa', (req, res) => {
  VisaModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
})

router.get('/approvedVisa/:formId', async (req, res) => {
  try {
    const user = await VisaModel.findOne({ formId: req.params.formId });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
})

router.post('/onsiteArrival', async (req, res) => {
  const { name, visaNo, tktNo, flightNo, from, via, to, flightDate, flightTime } = req.body;
  try {
    const newVisa = new ArrivalModel({ name, visaNo, tktNo, flightNo, from, via, to, flightDate, flightTime });
    await newVisa.save();
    res.json({ message: "Onsite arrival data saved successfully" });
  } catch (error) {
    res.json(error);
  }
})

router.get('/arrivals', (req, res) => {
  ArrivalModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
})


router.get('/arrival/:visaNo', async (req, res) => {
  try {
    const user = await ArrivalModel.findOne({ visaNo: req.params.visaNo });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
})


router.post('/onsiteDeparture', async (req, res) => {
  const { name, visaNo, tktNo, flightNo, from, via, to, flightDate, flightTime } = req.body;
  try {
    const newVisa = new DepartureModel({ name, visaNo, tktNo, flightNo, from, via, to, flightDate, flightTime });
    await newVisa.save();
    res.json({ message: "Onsite departure data saved successfully" });
  } catch (error) {
    res.json(error);
  }
})

router.get('/departures', (req, res) => {
  DepartureModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
})


router.get('/departure/:visaNo', async (req, res) => {
  try {
    const user = await DepartureModel.findOne({ visaNo: req.params.visaNo });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
})

router.get('/visa-count', async (req, res) => {
  try {
    const count = await VisaModel.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

export { router as visaRouter };