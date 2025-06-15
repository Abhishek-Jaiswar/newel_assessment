import Employee from "../models/employee.model.js";

export const getAllEmployees = async (req, res) => {
    try {
        const { userId } = req.user;
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }
        console.log(userId);

        const employees = await Employee.find({ userId }).sort({ dateOfJoining: -1 });
        res.status(200).json({
            message: "Employees fetched successfully",
            employees,
        });

    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

export const createEmployee = async (req, res) => {
    try {
        const { userId } = req.user;
        console.log("userId:", userId);

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }

        // get the employee details from the request body
        const { employeeName, department, dateOfJoining, address, gender, hobbies } = req.body;

        // Validate required fields
        if (!employeeName || !department || !dateOfJoining || !address || !gender || !hobbies) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const existingEmployee = await Employee.find({ employeeName, userId });
        if (existingEmployee.length > 0) {
            return res.status(409).json({
                message: "Employee with this name already exists",
            });
        }

        // Create a new employee instance
        const newEmployee = new Employee({
            employeeName,
            department,
            dateOfJoining,
            address,
            userId,
            gender,
            hobbies: Array.isArray(hobbies) ? hobbies : [hobbies], // Ensure hobbies is an array
        });

        // Save the employee to the database
        await newEmployee.save();

        // Respond with the created employee
        res.status(201).json({
            message: "Employee created successfully",
            employee: newEmployee,
        });
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        const { userId } = req.user;
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }

        const { employeeId } = req.params;
        if (!employeeId) {
            return res.status(400).json({
                message: "Employee ID is required",
            });
        }

        // Find the employee by ID and userId
        const employee = await Employee.findOneAndDelete({ _id: employeeId, userId });
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        // Respond with a success message
        res.status(200).json({
            message: "Employee deleted successfully",
            employee,
        });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

export const updateEmployee = async (req, res) => {
    try {
        const { userId } = req.user;
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }

        const { employeeId } = req.params;
        console.log("employeeId:", employeeId);
        
        if (!employeeId) {
            return res.status(400).json({
                message: "Employee ID is required",
            });
        }

        const { employeeName, department, dateOfJoining, address, hobbies, gender } = req.body;

        if (!employeeName || !department || !dateOfJoining || !address || !hobbies || !gender) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const employee = await Employee.findOneAndUpdate(
            { _id: employeeId, userId },
            {
                employeeName,
                department,
                dateOfJoining,
                address,
                hobbies: Array.isArray(hobbies) ? hobbies : [hobbies],
                gender
            },
            { new: true }
        );

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        res.status(200).json({
            message: "Employee updated successfully",
            employee,
        });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}


export const getEmployeeById = async (req, res) => {
    try {
        const { userId } = req.user;
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }
        const { employeeId } = req.params;
        if (!employeeId) {
            return res.status(400).json({
                message: "Employee ID is required",
            });
        }
        // Find the employee by ID and userId
        const employee = await Employee.findOne({ _id: employeeId, userId });
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        // Respond with the employee details
        res.status(200).json({
            message: "Employee fetched successfully",
            employee,
        });
    }
    catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

// export const searchEmployees = async (req, res) => {
//     try {
//         const { userId } = req.user;
//         if (!userId) {
//             return res.status(400).json({
//                 message: "User ID is required",
//             });
//         }
//         const { query } = req.query;
//         if (!query) {
//             return res.status(400).json({
//                 message: "Search query is required",
//             });
//         }
//         // Use a regex to search for employees by name or department
//         const regex = new RegExp(query, 'i'); // 'i' for case-insensitive search
//         const employees = await Employee.find({
//             userId,
//             $or: [
//                 { employeeName: regex },
//                 { department: regex },
//             ],
//         }).sort({ dateOfJoining: -1 });

//         if (employees.length === 0) {


//             return res.status(404).json({
//                 message: "No employees found",
//             });
//         }
//         // Respond with the found employees
//         res.status(200).json({
//             message: "Employees found",
//             employees,
//         });
//     } catch (error) {
//         console.error("Error searching employees:", error);
//         res.status(500).json({
//             message: "Internal server error",
//             error: error.message,
//         });
//     }
// }