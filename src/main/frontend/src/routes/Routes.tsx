import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import Home from './Home';
import Login from './LogIn';
import SignUp from './SignUp';
import TodoApp from './TodoApp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/todoapp',
    element: <TodoApp />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
