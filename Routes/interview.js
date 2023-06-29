import express from 'express';
import { Applicant } from "../Models/VisaApplication.js";
import { Interview } from '../Models/Interview.js';

const router = express.Router();

router.post('/createInterview/:formId', async (req, res) => {
    // console.log(req.params.formId);
    const applicant = await Applicant.findOne({ formId: req.params.formId });
    applicant.formInfo.status = 'processing';
    await applicant.save();
    const interview = new Interview({
        formId: applicant.personalInfo.formId,
        name: applicant.personalInfo.firstname + ' ' + applicant.personalInfo.lastname,
        appliedCountry: applicant.travelInfo.appliedCountry,
    })
    await interview.save();
    res.json({ message: "Application is proccessing now, Interview is initiated." })
});

router.post('/schedule', async (req, res) => {
    const { formId, interviewTime, interviewVenue } = req.body;
    const applicant = await Interview.findOne({ formId: formId });
    try {
        applicant.interviewTime = interviewTime;
        applicant.interviewVenue = interviewVenue;
        applicant.status = 'Interview Scheduled';
        await applicant.save();
        res.json({ message: "Interview scheduled successfully"});
    } catch (error) {
        res.json(error);
    }
})

router.post('/reject/:formId', async(req,res)=>{
    const applicant = await Interview.findOne({ formId: req.params.formId });
    try {
        await applicant.remove();
        res.json({ message: "Interview rejected"});
    } catch (error) {
        res.json(error);
    }
})

router.post('/attend/:formId', async (req, res) => {
    const applicant = await Interview.findOne({ formId: req.params.formId });
    try {
        applicant.status = 'Interview Completed';
        await applicant.save();
        res.json({ message: "Interview attended successfully"});
    } catch (error) {
        res.json(error);
    }
})

router.get('/interviewDetails', (req, res) => {
    Interview.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

router.get('/interviewDetails/:formId', async (req, res) => {
    try {
      const interview = await Interview.findOne({ formId: req.params.formId });
      if (!interview) {
        return res.status(404).send('User not found');
      }
      res.json(interview);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
});

router.get('/interview-count', async (req, res) => {
    try {
      const count = await Interview.countDocuments({ status: 'Interview Completed'});
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
});

export { router as interviewRouter };