import express from 'express';
import Razorpay from 'razorpay';

const router = express.Router();
import { Payments } from '../Models/Payments.js';

var razorpay = new Razorpay({
  key_id: 'rzp_test_VhZWRTo5Vl8n6L',
  key_secret: 'Uf7tVt6XIi6HuwBLw6pNsQcG',
});

router.post('/createOrder', async (req, res) => {
  try {
    const { amount, currency, formId } = req.body;
    const user = await Payments.findOne({ formId })
    if(user){
      return res.json({ flag: true });
    }
    const options = {
      amount: amount * 100, // Convert to paise or the smallest currency unit
      currency,
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/apply', async(req,res) => {
  const {formId, appliedTime, response, amount, currency} = req.body;
  const newPayment = await new Payments({
    formId, appliedTime, response, amount, currency
  })
  await newPayment.save();
  res.json({ message: "Your all data submitted succefully. Click Ok to continue"});
})

router.get('/payment/:formId', async(req,res) => {
  try {
    const user = await Payments.findOne({ formId: req.params.formId})
    res.json(user)
  } catch (error) {
    console.error(error);
  }
})

export { router as payRouter };