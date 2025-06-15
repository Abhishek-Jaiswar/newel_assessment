import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import AddEditPage from '../pages/AddEditPage';
import App from '../App';
import ListPage from '../pages/ListPage';
import Login from '../pages/Login';
import Register from '../pages/Register';


// This is the place where we define the routes for our application, this approach
// is more suitable for larger applications where we want to keep the routing logic
// separate from the components. It allows us to define routes in a more structured way.

// The routes are defined using the createBrowserRouter function from react-router-dom.
// createBrowserRouter is the new way to define routes in React Router v6.4 and above.
const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'list', element: <ListPage /> },
            { path: 'edit/:id', element: <AddEditPage /> },
            { path: "add", element: <AddEditPage /> },
            { path: '*', element: <NotFoundPage /> },
        ]
    }
])

export default AppRouter;