import express from 'express';
import { Login, logout, Register } from '../controllers/user.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.post('/logout', logout);

router.get("/me", authenticate, (req, res) => {
    res.status(200).json({
        message: "User fetched successfully",
        user: req.user,
    });
});

export default router;