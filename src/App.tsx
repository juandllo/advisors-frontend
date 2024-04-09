import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout'
import Dashboard from '@/pages/dashboard'
import Notifications from '@/pages/notifications'
import Orders from '@/pages/orders'
import NotFound from '@/pages/notFound'
import Balance from '@/pages/balance'
import Tickets from '@/pages/tickets'
import Account from '@/pages/account'
import Login from '@/pages/login'
import { ThemeProvider } from '@/theme/themeProvider'
import { endpoints } from '@/config/endpoints';
import { getHttp } from '@/helpers/httpHelpers';
import './App.css'
import { useUserStore } from '@/context/userContext';

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

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout><Dashboard /></Layout>} />
          <Route path='/notificaciones' element={<Layout><Notifications /></Layout>} />
          <Route path='/pedidos' element={<Layout><Orders /></Layout>} />
          <Route path='/saldo' element={<Layout><Balance /></Layout>} />
          <Route path='/tickets' element={<Layout><Tickets /></Layout>} />
          <Route path='/cuenta' element={<Layout><Account /></Layout>} />
          <Route path='/inicio-sesion' element={<Login />} />
          <Route path='*' element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
