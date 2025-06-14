// This file will provide all the configuration of app
import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    // This will make sure the requests are Allowed from my client only.
    credentials: true, // Allow cookies and credentials from client
};

app.use(cors(corsOptions));
app.use(express.json()); // This middleware will parse the incoming json request
app.use(express.urlencoded({ extended: true })); // This middleware 

app.get('/', (req, res) => {
    res.status(200).json({
        message: "I'm okay!"
    })
})


export default app;