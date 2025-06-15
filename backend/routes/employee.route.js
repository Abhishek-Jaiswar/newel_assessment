import express from 'express';
import {
    createEmployee,
    deleteEmployee,
    getAllEmployees,
    updateEmployee
} from '../controllers/employee.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

// Protect all routes that need authentication
router.get('/', authenticate, getAllEmployees); //
router.post('/', authenticate, createEmployee);
router.put('/:employeeId', authenticate, updateEmployee);
router.delete('/:id', authenticate, deleteEmployee);

export default router;
