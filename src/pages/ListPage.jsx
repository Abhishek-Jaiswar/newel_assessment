import React, { useEffect, useState } from 'react'
import '../styles/ListPage.css'
import { Link } from 'react-router-dom'
import axios from '../libs/axios'

const ListPage = () => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/employees', { withCredentials: true })
        setData(response.data.employees)
      } catch (error) {
        console.error(error)
        setError('Failed to fetch employees')
      } finally {
        setLoading(false)
      }
    }
    fetchEmployees()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return
    try {
      await axios.delete(`/employees/${id}`)
      setData(prev => prev.filter(item => item._id !== id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete employee.')
    }
  }

  const filteredData = data.filter((item) =>
    item.employeeName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="list-container">
      <h2 className="header">List Page</h2>

      <div className="btn-container">
        <Link to="/add">
          <p className="add-btn">Add New</p>
        </Link>
      </div>

      <div className="toolbar">
        <label htmlFor="search">Search List</label>
        <input
          type="text"
          placeholder="Search employee eg: aman rathore"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <p className="table-title">Search List Table:</p>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="no-data">{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Date of Joining</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item._id}>
                <td>{item.employeeName}</td>
                <td>{item.department}</td>
                <td>{item.dateOfJoining}</td>
                <td className="actions">
                  <Link to={`/view/${item._id}`} title="View">
                    <p className='act-btn'>View</p>
                  </Link>
                  <Link to={`/edit/${item._id}`} title="Edit">
                    <p className='act-btn'>Edit</p>
                  </Link>
                  <button className='act-btn' onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="4" className="no-data">No results found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ListPage
