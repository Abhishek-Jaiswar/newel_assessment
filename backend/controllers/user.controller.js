import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const Register = async (req, res) => {
    try {
        // 
        const { username, email, contact, password } = req.body;

        // Basic server side validation
        if (!username || !email || !contact || !password) {
            return res.status(400).json({
                message: "All fields are required",
                status: false
            })
        }

        // Check if user allready exist or not if yes show error otherwise create account
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User allready exist with this email",
                status: false
            })
        }

        // We are using bcrypt to secure the password of user, this lib help us to encrypt the data with minimal effort 

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            username,
            email,
            contact,
            password: hashedPassword,
        })

        res.status(201).json({
            message: "User created successful",
        })


    } catch (error) {
        console.error("Registration failed: ", error)
        return res.status(500).json({
            message: "Failed to create account",
            status: false
        })
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password, contact } = req.body;
        // Basic server side validation
        if ((!email && !contact) || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                status: false
            });
        }

        // Check if user exists
        const user = await User.findOne({ $or: [{ email }, { contact }] });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: false
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password",
                status: false
            });
        }
        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' } // Token validity
        );

        // Set token in cookies
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({
            message: "Login successful",
            status: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                contact: user.contact
            }
        });
    } catch (error) {
        console.error("Login failed: ", error);
        return res.status(500).json({
            message: "Failed to login",
            status: false
        });
    }
}

export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    return res.status(200).json({
        message: 'Logout successful',
        status: true,
    });
};
