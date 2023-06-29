import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();
import { UserModel } from "../Models/User.js";

router.post('/register', async (req, res) => {
    const userId = 'USR' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const { email, password, firstname, lastname, fatherName, motherName, gender, phone, dateOfBirth } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
        return res.json({ message: "User registered already with mentioned details" });
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new UserModel({ userId, email, password: hashedPassword, firstname, lastname, fatherName, motherName, gender, phone, dateOfBirth });
    await newUser.save();
    res.json({ message: "User registered successfully" });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
        return res.json({ message: "User doesn't exist with this login credentials" });
    }
    if (!user.isActive) {
        return res.json({ message: "Your registration is on hold from HR side" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.json({ message: "Password Does not match" });
    } else {
        return res.json(user)
        // const token = jwt.sign({ id: user._id }, "secret");
        // return res.json({ token, userId: user._id });
    }
});

router.post('/activate', async (req, res) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    user.isActive = true;
    await user.save();
    res.json({ message: "User Activated" });
})

router.post('/reject', async (req, res) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    await user.remove();
    res.json({ message: "User Rejected" });
})

router.get('/userdetails', (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

router.get('/count', async (req, res) => {
    try {
      const count = await UserModel.countDocuments();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
});


router.get('/active-count', async (req, res) => {
    try {
      const count = await UserModel.countDocuments( { isActive: true } );
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
});

export { router as userRouter };