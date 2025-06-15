import { Outlet } from 'react-router-dom'

// This is the main App component that serves as a layout for the application.
// It uses the Outlet component from react-router-dom to render child routes.
// The Outlet component acts as a placeholder for the child routes defined in the router configuration.

const App = () => {
  return (
    <div className=''>
      <Outlet /> {/* This will render the child routes */}
    </div>
  )
}

export default App