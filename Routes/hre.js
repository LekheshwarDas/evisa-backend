import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();
import { OfficerModel } from "../Models/Hre.js";
import multer from 'multer';
import fs from 'fs';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // const filename = `${Date.now()}-${file.originalname}`;
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });


router.post('/register', upload.single('profilePhoto'), async (req, res) => {
    const hrId = 'HR'+Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const { email, firstname, lastname, fatherName, motherName, addressLine1, addressLine2, gender, phone, dateOfBirth, country, state, city, pincode } = req.body;
    
    const user = await OfficerModel.findOne({ email });
    if (user) {
        return res.json({ message: "HRE registered already with mentioned details" });
    }

    const password = firstname+'@123';
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new OfficerModel({
        hrId, email, password: hashedPassword, firstname, lastname, fatherName, motherName, addressLine1, addressLine2, gender, phone, dateOfBirth, country, state, city, pincode,
        profilePhoto: {
            data: fs.readFileSync('uploads/' + req.file.filename),
            contentType: req.file.mimetype
        }
    });
    await newUser.save();
    res.json({ message: "HRE registered successfully" });
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const hre = await OfficerModel.findOne({ email: email });

    if (!hre) {
        return res.json({ message: "User or password is incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, hre.password);

    if (!isPasswordValid) {
        return res.json({ message: "Password Does not match" });
    } else {
        return res.json(hre)
        // const token = jwt.sign({ id: hre._id }, "secret");
        // return res.json({ token, hreId: hre });
    }
});

router.get('/hrdetails', (req, res) => {
    OfficerModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

router.post('/reject', async (req, res) => {
    const { email } = req.body;
    const user = await OfficerModel.findOne({ email: email });
    await user.remove();
    res.json({ message: "Executive removed successfully" });
})


router.get('/count', async (req, res) => {
    try {
      const count = await OfficerModel.countDocuments();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
});



export { router as hreRouter };