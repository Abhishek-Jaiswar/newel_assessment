import { User } from "../models/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import generateToken from "../handlers/generateToken";

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

        const hashedPassword = bcrypt.hash(password, 10)

        const newUser = await User.create({
            username,
            email,
            contact,
            password: hashedPassword,
        })


        const token = generateToken(newUser._id)

        res.status(201).json({
            message: "User created successful",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
            token,
        })


    } catch (error) {
        console.error("Registration failed: ", error)
        return res.status(500).json({
            message: "Failed to create account",
            status: false
        })
    }
}