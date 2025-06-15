import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    dateOfJoining: {
        type: Date,
        default: Date.now(),
    },
    address: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    hobbies: {
        type: [String],
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {timestamps: true});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;

// This code defines a Mongoose schema for an Employee model with fields for employee name, department, date of joining, address