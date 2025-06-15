import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

async function connectToDb() {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);

        // In production grade applications, We handle the different types of 
        // connection status for the database such as "connected", "failed", "error" etc.
        // For now we can just connect and use without handling the status.
        // we'll just log the status of current state of database.
        console.log("Database is connected: ", connection.connection.host);

    } catch (error) {
        console.log("Failed to connect with database: ", error);
        process.exit(1);
    }
}

export default connectToDb;