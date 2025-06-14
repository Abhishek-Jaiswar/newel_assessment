import React from 'react'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <Outlet /> {/* This will render the child routes */}
    </div>
  )
}

export default App