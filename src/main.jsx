import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'

// This is the entry point of our application, where we render the main App component
// using ReactDOM's createRoot method.

// The RouterProvider is used to provide the routing context to the application,
// allowing us to use React Router's features like navigation and route matching.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
