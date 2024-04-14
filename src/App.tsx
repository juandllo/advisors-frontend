import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from '@/layout/layout';
import Dashboard from '@/pages/dashboard';
import Notifications from '@/pages/notifications';
import Orders from '@/pages/orders/orders';
import NotFound from '@/pages/notFound';
import Balance from '@/pages/balance';
import Tickets from '@/pages/tickets';
import Account from '@/pages/account';
import Login from '@/pages/login';
import NewOrder from '@/pages/orders/newOrder';

import { ThemeProvider } from '@/theme/themeProvider';
import { endpoints } from '@/config/endpoints';
import { getHttp } from '@/helpers/httpHelpers';
import { useUserStore } from '@/context/userContext';
import './App.css';

function App() {
  const [updateUser] = useUserStore((state) => [state.updateUser]);
  const userId = '66120fb9738cf0d06663d6b0'; // TODO eliminar este dato y obtenerlo de la sesion del usuario

  useEffect(() => {
    handleFetchUser();
  }, []);

  const handleFetchUser = async () => {
    getHttp(`${endpoints.users}/${userId}`)
      .then((res: any) => {
        updateUser(res)
      });
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: 'inicio',
          element: <Dashboard />
        },
        {
          path: 'notificaciones',
          element: <Notifications />
        },
        {
          path: 'pedidos',
          element: <Orders />,
          children: [
            
          ]
        },
        {
          path: 'pedidos/nuevo',
          element: <NewOrder />
        },
        {
          path: '/saldo',
          element: <Balance />
        },
        {
          path: '/tickets',
          element: <Tickets />
        },
        {
          path: '/cuenta',
          element: <Account />
        },
      ]
    },
    {
      path: '/inicio-sesion',
      element: <Login />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
