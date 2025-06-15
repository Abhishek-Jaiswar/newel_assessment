"use client"

import { useEffect, useState } from "react"
import "../styles/EmployeeForm.css"

const EmployeeForm = ({ mode = "add", initialData = {}, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    employeeName: "",
    department: "",
    dateOfJoining: "",
    address: "",
    gender: "",
    hobbies: [],
  })

  const hobbyOptions = ["Reading", "Swimming", "Playing", "Singing"]
  const departmentOptions = ["Engineering", "HR", "Sales", "Marketing"]

  useEffect(() => {
    if (initialData) {
      setFormData({
        employeeName: initialData.employeeName || "",
        department: initialData.department || "",
        dateOfJoining: initialData.dateOfJoining?.substring(0, 10) || "",
        address: initialData.address || "",
        gender: initialData.gender || "",
        hobbies: initialData.hobbies || [],
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleHobbyChange = (e) => {
    const { value, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      hobbies: checked ? [...prev.hobbies, value] : prev.hobbies.filter((h) => h !== value),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>{mode === "edit" ? "Edit Employee" : "Add New Employee"}</h2>
          <p>Fill in the employee information below</p>
        </div>

        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="employeeName">Employee Name *</label>
              <input
                type="text"
                id="employeeName"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department *</label>
              <select id="department" name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                {departmentOptions.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dateOfJoining">Date of Joining *</label>
              <input
                type="date"
                id="dateOfJoining"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group gender-group">
              <label>Gender</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  Male
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  Female
                </label>
              </div>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="4"
              placeholder="Enter complete address"
            />
          </div>

          <div className="form-group full-width">
            <label>Hobbies</label>
            <div className="checkbox-group">
              {hobbyOptions.map((hobby) => (
                <label key={hobby} className="checkbox-option">
                  <input
                    type="checkbox"
                    value={hobby}
                    checked={formData.hobbies.includes(hobby)}
                    onChange={handleHobbyChange}
                  />
                  <span className="checkbox-custom"></span>
                  {hobby}
                </label>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onBack}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {mode === "edit" ? "Update Employee" : "Save Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmployeeForm
