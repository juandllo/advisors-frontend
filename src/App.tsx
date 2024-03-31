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
import './App.css'

function App() {
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
