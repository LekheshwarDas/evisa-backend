import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();
import { AdminModel } from "../Models/Admin.js";

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const admin = await AdminModel.findOne({ email });
    if (admin) {
        return res.json({ message: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new AdminModel({ email, password: hashedPassword });
    await newAdmin.save();
    res.json({ message: "Admin registered successfully" });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({ email: email });

    if (!admin) {
        return res.json({ message: "User or password is incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
        return res.json({ message: "Password Does not match" });
    } else {
        const token = jwt.sign({ id: admin._id }, "secret");
        return res.json({ token, adminId: admin._id });
    }
});

router.post('/update', async (req, res) => {
    const { id, newEmail, password, newPassword } = req.body;
    try {
        const admin = await AdminModel.findOne({ _id: id });
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.json({ message: "Password Does not match" });
        } else {
            admin.email = newEmail;
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            admin.password = hashedPassword;
            await admin.save();
            res.json({message: "Email and password successfully updated"})
        }    
    } catch (error) {
        res.json(error);
    }
    
})
export { router as adminRouter };