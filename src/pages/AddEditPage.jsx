import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../libs/axios';
import EmployeeForm from '../components/EmployeeForm'; 
import '../styles/EmployeeForm.css'; //

const AddEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(false);

  //Fetch employee if in edit mode
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/employees/${id}`, {
            withCredentials: true,
          });
          setEmployeeData(response.data.employee);
        } catch (err) {
          console.error("Error fetching employee:", err);
        }
      };

      fetchData();
    }
  }, [id]);

  // Handle form submission (add or edit)
  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (id) {
        await axios.put(`/employees/${id}`, formData, {
          withCredentials: true,
        });
        alert("Employee updated successfully");
      } else {
        await axios.post('/employees', formData, {
          withCredentials: true,
        });
        alert("Employee added successfully");
      }

      navigate('/list'); // ✅ Navigate to list page after submit
    } catch (err) {
      console.error("Error submitting form:", err);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fomr">
      <EmployeeForm
        mode={id ? 'edit' : 'add'}
        initialData={employeeData}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default AddEditPage;
