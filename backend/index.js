// While we can make simple one file backend configurations, it is better to
// separate the backend into multiple files for better organization and maintainability.
// This file serves as the entry point for the backend, importing and exporting all necessary modules.

import app from "./app.js";
import connectToDb from "./config/db.js";
import dotenv from 'dotenv';

dotenv.config()


const PORT = process.env.PORT

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`The server is listening on port: http://localhost:${PORT}`);
        })

        connectToDb()

    } catch (error) {
        console.log("Failed to start server: ", error);
    }
}

startServer()