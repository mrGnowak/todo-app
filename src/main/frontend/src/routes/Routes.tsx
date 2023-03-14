import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import TodoApp from './TodoApp';
import React from 'react';
import { useUser } from '../UserProvider';
import Logout from './Logout';

export default function Routes() {
  const user = useUser();
  console.log('🚀 ~ file: Routes.tsx:12 ~ Routes ~ user:', user);

  const router = React.useMemo(() => {
    return createBrowserRouter([
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
      ...(user == null
        ? [
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
          ]
        : [
            {
              path: '/logout',
              element: <Logout />,
              errorElement: <ErrorPage />,
            },
          ]),
    ]);
  }, [user]);

  return <RouterProvider router={router} />;
}
