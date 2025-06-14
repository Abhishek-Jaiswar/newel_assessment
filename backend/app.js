// This file will provide all the configuration of app
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/auth.route.js';

const app = express();

// Middlewares
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    // This will make sure the requests are Allowed from my client only.
    credentials: true, // Allow cookies and credentials from client
};

app.use(cors(corsOptions));
app.use(express.json()); // This middleware will parse the incoming json request
app.use(express.urlencoded({ extended: true })); // This middleware will parse the incoming urlencoded request
app.use(cookieParser()); // This middleware will parse the cookies from the request


// Routes


// Registering user routes
// This will handle all the user related routes like login, signup, etc.
app.use('/api/users', userRoutes);

// Health check route
app.get('/', (req, res) => {
    res.status(200).json({
        message: "I'm okay!"
    })
})


export default app;